import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

const AuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ 
                    email: credentials.email 
                });

                if (!user) {
                    client.close();
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    client.close();
                    throw new Error('Could not log you in!');
                }

                client.close();

                return { 
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email 
                };
        },
        }),
    ],
    callbacks: {
        session({ session, token }) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.firstName = token.firstName;
          session.user.lastName = token.lastName;
          return session;
        },
        jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.email = user.email;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }

            return token;
        }
    },
    session: {
        strategy: 'jwt'
    },
    secret: process.env.JWT_SECRET
};

export default NextAuth(AuthOptions);