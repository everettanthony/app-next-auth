import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = MongoClient.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.pnqxkku.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`);

    return client;
}