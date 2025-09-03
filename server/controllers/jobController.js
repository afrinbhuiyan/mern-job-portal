const connectDB = require("../config/db");
const Job = require("../models/Job");
const { ObjectId } = require("mongodb");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);

    const { title, company, location, description, price, remoteOnsite, technologies } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const result = await jobs.insertOne({
      title,
      company,
      location,
      description,
      price: price || null,
      remoteOnsite: remoteOnsite || "Onsite", // "Remote" | "Onsite" | "Hybrid"
      technologies: technologies || [],       // array of strings
      userId: ObjectId(req.user.id),
      createdAt: new Date(),
    });

    const newJob = await jobs.findOne({ _id: result.insertedId });

    res.json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Jobs for Logged-in User
exports.getJobs = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);

    const userJobs = await jobs.find({ userId: ObjectId(req.user.id) }).toArray();
    res.json(userJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);
    const { id } = req.params;

    const job = await jobs.findOne({ _id: ObjectId(id) });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.userId.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

    const { title, company, location, description, price, remoteOnsite, technologies } = req.body;

    await jobs.updateOne(
      { _id: ObjectId(id) },
      { $set: { title, company, location, description, price, remoteOnsite, technologies } }
    );

    const updatedJob = await jobs.findOne({ _id: ObjectId(id) });
    res.json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);
    const { id } = req.params;

    const job = await jobs.findOne({ _id: ObjectId(id) });
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.userId.toString() !== req.user.id) return res.status(403).json({ msg: "Unauthorized" });

    await jobs.deleteOne({ _id: ObjectId(id) });
    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
