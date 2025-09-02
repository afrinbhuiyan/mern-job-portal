const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const client = new MongoClient(process.env.MONGO_URI);

async function start() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected...");

    const db = client.db(); // default DB from URI
    const users = db.collection("users");

    // Sample route
    app.get("/", (req, res) => {
      res.send("Hello MERN Job Portal API 🚀");
    });

    // Example: Register (very basic, without hashing)
    app.post("/register", async (req, res) => {
      const { name, email, password } = req.body;
      await users.insertOne({ name, email, password });
      res.json({ msg: "User registered" });
    });

    // Example: Get all users
    app.get("/users", async (req, res) => {
      const allUsers = await users.find().toArray();
      res.json(allUsers);
    });

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
