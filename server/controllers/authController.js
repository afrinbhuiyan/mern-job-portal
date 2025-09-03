const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const User = require("../models/User");

// ✅ Register User
exports.registerUser = async (req, res) => {
  try {
    const db = await connectDB();
    const users = User(db);

    let { name, email, password } = req.body;

    // Lowercase email
    email = email.trim().toLowerCase();

    const existing = await users.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await users.insertOne({ name, email, password: hashedPassword });

    const newUser = await users.findOne({ _id: result.insertedId });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Registered user:", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const db = await connectDB();
    const users = User(db);

    let { email, password } = req.body;
    email = email.trim().toLowerCase();

    const user = await users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
