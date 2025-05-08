import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('🔌 Conectado a MongoDB');
  }
  return db;
}

export function collection(name) {
  return async () => {
    const database = await connectDB();
    return database.collection(name);
  };
}

export { ObjectId };
