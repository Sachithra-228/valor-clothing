import { MongoClient, type Db } from "mongodb";

// Cached on globalThis so Next.js dev hot reloads reuse one connection pool
// instead of opening a new one on every module re-evaluation.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

export function getMongoClient() {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not set. Add it to .env.local.");

    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // Drop the failed attempt so the next request can retry.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "valor");
}
