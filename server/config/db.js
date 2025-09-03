const { MongoClient } = require("mongodb");
require("dotenv").config();

let db;

async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("✅ MongoDB connected!");

    db = client.db("jobportal"); // database name
    return db;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // stop server if cannot connect
  }
}

module.exports = connectDB;
