const express = require("express");
const {
  getAllJobsPublic,
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public route
router.get("/public", getAllJobsPublic);

// Protected routes
router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getJobs);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
