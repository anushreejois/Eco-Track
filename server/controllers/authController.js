const pool = require("../db/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
// ===================== REGISTER =====================
//
const registerUser = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      message: "Email, username, and password are required.",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (email, password_hash, username, level, xp, badges)
       VALUES ($1, $2, $3, 1, 0, $4)
       RETURNING id, email, username, level, xp, badges`,
      [normalizedEmail, hashedPassword, username, []]
    );

    const user = newUser.rows[0];

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("❌ Register error:", error);
    res.status(500).json({
      message: "Server error during registration.",
    });
  }
};

//
// ===================== LOGIN (FIXED) =====================
//
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("📥 LOGIN REQUEST:", email);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail]
    );

    console.log("👤 USER RESULT:", userResult.rows);

    // ✅ User not found
    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "User not found.",
      });
    }

    const user = userResult.rows[0];

    // ✅ Password exists check
    if (!user.password_hash) {
      console.error("❌ Missing password_hash in DB");
      return res.status(500).json({
        message: "User password not set.",
      });
    }

    // ✅ Compare password safely
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid credentials.",
      });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level,
        xp: user.xp,
        badges: user.badges,
      },
    });

  } catch (error) {
    console.error("🔥 LOGIN ERROR FULL:", error);
    res.status(500).json({
      message: "Server error during login.",
    });
  }
};

//
// ===================== GET PROFILE =====================
//
const getProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT id, email, username, level, xp, badges FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error("❌ Get profile error:", error);
    res.status(500).json({
      message: "Error fetching user profile.",
    });
  }
};

//
// ===================== USER STATS =====================
//
const getUserStats = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT level, xp, badges FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { level, xp, badges } = result.rows[0];

    res.status(200).json({ level, xp, badges });
  } catch (error) {
    console.error("❌ Stats fetch error:", error);
    res.status(500).json({
      message: "Server error while fetching stats.",
    });
  }
};

//
// ===================== IMPACT SUMMARY =====================
//
const getImpactSummary = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      `SELECT action_type, SUM(amount) AS total_amount
       FROM actions
       WHERE user_id = $1
       GROUP BY action_type`,
      [userId]
    );

    res.status(200).json({ summary: result.rows });
  } catch (error) {
    console.error("❌ Impact summary error:", error);
    res.status(500).json({
      message: "Server error while fetching summary.",
    });
  }
};

//
// ===================== LEADERBOARD =====================
//
const getLeaderboard = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, level, xp FROM users ORDER BY xp DESC LIMIT 10"
    );

    res.status(200).json({ leaderboard: result.rows });
  } catch (err) {
    console.error("❌ Leaderboard error:", err);
    res.status(500).json({
      error: "Failed to fetch leaderboard",
    });
  }
};

//
// ===================== UPDATE PROFILE =====================
//
const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { email, username } = req.body;

  if (!email || !username) {
    return res.status(400).json({
      message: "Email and username are required.",
    });
  }

  try {
    await pool.query(
      "UPDATE users SET email = $1, username = $2 WHERE id = $3",
      [email.toLowerCase(), username, userId]
    );

    res.status(200).json({
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("❌ Update profile error:", error);
    res.status(500).json({
      message: "Error updating profile.",
    });
  }
};

//
// ===================== DELETE ACCOUNT =====================
//
const deleteAccount = async (req, res) => {
  const userId = req.userId;

  try {
    await pool.query("DELETE FROM actions WHERE user_id = $1", [userId]);
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.status(200).json({
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error("❌ Delete account error:", error);
    res.status(500).json({
      message: "Error deleting account.",
    });
  }
};

//
// ===================== EXPORT =====================
//
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUserStats,
  getImpactSummary,
  getLeaderboard,
  updateProfile,
  deleteAccount,
};