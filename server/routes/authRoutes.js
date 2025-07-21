const express = require("express");
const router = express.Router();
const pool = require("../db/connect"); // ✅ DB connection

const {
  registerUser,
  loginUser,
  getProfile,
  getUserStats,
  getImpactSummary,
  getLeaderboard,
  updateProfile,       // ✅ Added
  deleteAccount        // ✅ Added
} = require("../controllers/authController");

const verifyToken = require("../middleware/authMiddleware");

// 🔐 Auth and User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.get("/user/stats", verifyToken, getUserStats);
router.get("/user/summary", verifyToken, getImpactSummary);

// 🏆 Leaderboard
router.get("/leaderboard", getLeaderboard);

// ⚙️ Settings
router.put("/profile", verifyToken, updateProfile);      // ✅ Update
router.delete("/profile", verifyToken, deleteAccount);   // ✅ Delete

module.exports = router;
