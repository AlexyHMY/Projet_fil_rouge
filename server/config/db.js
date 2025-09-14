import { MongoClient } from "mongodb";

let client;
let db;

export const connectDB = async (uri) => {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("fil_rouge");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) throw new Error("Database not connected. Call connectDB first.");
  return db;
};