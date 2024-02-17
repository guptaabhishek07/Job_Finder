const express = require("express");
const router = express.Router();
const {
  createResume,
  fetchResume,
} = require("../controllers/createResumeController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//jobs routes

// /api/job/create
router.post("/resume/create", createResume);
router.get("/resume/fetch", fetchResume);

module.exports = router;
