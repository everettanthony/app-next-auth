import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = MongoClient.connect('mongodb+srv://dbUser:2rVmnAtL3t1mNH1Q@cluster0.pnqxkku.mongodb.net/auth-demo?retryWrites=true&w=majority');

    return client;
}