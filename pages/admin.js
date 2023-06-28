import { useSession } from 'next-auth/react'
import connectToDatabase from '../../../lib/db'
import Head from 'next/head'
import AccessDenied from '@/components/auth/access-denied';

export default async function AdminPage() {
    const { data: session } = useSession();
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({
        email: credentials.email,
    });

    if (!session) {
        return (
            <div>
                <AccessDenied />
            </div>
        )
    }

    return (
        <div>
            <Head>
                <title>Admin</title>
            </Head>
            Welcome back, {user.email}
        </div>
    );
}