const express = require("express");
const router = express.Router();
const pool = require("../db/connect");
const jwt = require("jsonwebtoken");

// 🔐 AUTH MIDDLEWARE
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};


// 🧑 PROFILE
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, username, level, xp FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 🏆 LEADERBOARD
router.get("/leaderboard", async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT username, level, xp FROM users ORDER BY xp DESC LIMIT 10"
    );

    res.json({ leaderboard: users.rows });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// 📊 USER STATS / SUMMARY
router.get("/stats", authenticate, async (req, res) => {
  try {
    const actions = await pool.query(
      "SELECT COUNT(*) as total FROM actions WHERE user_id = $1",
      [req.user.id]
    );

    res.json({
      totalActions: actions.rows[0].total
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;