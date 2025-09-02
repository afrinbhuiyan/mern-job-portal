const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

async function connectDB() {
  if (db) return db; 

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  console.log("✅ MongoDB connected...");
  db = client.db(); 
  return db;
}

module.exports = connectDB;