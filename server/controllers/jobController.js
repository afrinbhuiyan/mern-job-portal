const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);

    const {
      title,
      company,
      location,
      description,
      price,
      remoteOnsite,
      technologies,
    } = req.body;
    if (!title || !company || !location || !description) {
      return res
        .status(400)
        .json({ msg: "Please provide all required fields" });
    }

    const result = await jobs.insertOne({
      title,
      company,
      location,
      description,
      price: price || null,
      remoteOnsite: remoteOnsite || "Onsite",
      technologies: technologies || [],
      userId: new ObjectId(req.user.id),
      createdAt: new Date(),
    });

    const newJob = await jobs.findOne({ _id: result.insertedId });
    res.json(newJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Jobs (public - no login required)
exports.getAllJobsPublic = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);

    const allJobs = await jobs.find({}).toArray();

    console.log(allJobs);

    res.json(allJobs);
  } catch (err) {
    console.error("Error in getAllJobsPublic:", err);
    res.status(500).json({ msg: "Server error while fetching public jobs" });
  }
};

// Get All Jobs (for logged-in user)
exports.getJobs = async (req, res) => {
  try {
    console.log("Fetching jobs for user:", req.user);

    if (!req.user?.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const db = await connectDB();
    const jobs = Job(db);

    const userJobs = await jobs
      .find({ userId: new ObjectId(req.user.id) })
      .toArray();

    res.json(userJobs);
  } catch (err) {
    console.error("Error in getJobs:", err);
    res.status(500).json({ msg: "Server error while fetching jobs" });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid job ID" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const existingJob = await jobs.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user.id),
    });

    if (!existingJob) return res.status(404).json({ msg: "Job not found" });

    const {
      title,
      company,
      location,
      description,
      price,
      remoteOnsite,
      technologies,
    } = req.body;

    const updatedData = {
      title,
      company,
      location,
      description,
      price: price ? Number(price) : null,
      remoteOnsite: remoteOnsite || "Onsite",
      technologies: Array.isArray(technologies) ? technologies : [],
    };

    await jobs.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    const updatedJob = await jobs.findOne({ _id: new ObjectId(id) });
    res.json(updatedJob);
  } catch (err) {
    console.error("Error in updateJob:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const db = await connectDB();
    const jobs = Job(db);
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid job ID" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ msg: "User not authenticated" });
    }

    const existingJob = await jobs.findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(req.user.id),
    });

    if (!existingJob) return res.status(404).json({ msg: "Job not found" });

    await jobs.deleteOne({ _id: new ObjectId(id), userId: new ObjectId(req.user.id) });

    res.json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error("Error in deleteJob:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
