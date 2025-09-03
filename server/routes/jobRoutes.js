const express = require("express");
const router = express.Router();
const { getJobs, createJob, updateJob, deleteJob } = require("../controllers/jobController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /api/jobs → public
router.get("/", getJobs);

// Protected routes
router.post("/", authMiddleware, createJob);
router.put("/:id", authMiddleware, updateJob);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
