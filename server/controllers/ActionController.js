const pool = require("../db/connect");
const {
  calculateXP,
  determineLevel,
  assignBadges,
} = require("../utils/xpcalculator"); // ✅ Fix path case

// 🔄 Log an Action with XP/Level/Badge Logic
const logAction = async (req, res) => {
  const { action_type, amount } = req.body;
  const userId = req.userId;

  // ✅ Validate input
  if (!action_type || isNaN(parseFloat(amount))) {
    return res.status(400).json({ message: "Missing or invalid action type/amount." });
  }

  try {
    const parsedAmount = parseFloat(amount);

    // ➕ Insert new action
    const result = await pool.query(
      "INSERT INTO actions (user_id, action_type, amount) VALUES ($1, $2, $3) RETURNING *",
      [userId, action_type, parsedAmount]
    );
    const action = result.rows[0];

    // 👤 Get current user
    const userRes = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
    const user = userRes.rows[0];

    // 🧮 Calculate XP, Level
    const xpGained = calculateXP(action_type, parsedAmount);
    const newXP = user.xp + xpGained;
    const newLevel = determineLevel(newXP);

    // 🔢 Count total actions
    const countRes = await pool.query(
      "SELECT COUNT(*) FROM actions WHERE user_id = $1",
      [userId]
    );
    const totalActions = parseInt(countRes.rows[0].count);

    // 🏅 Determine new badges
    const newBadges = assignBadges(newXP, totalActions);

    // 🔁 Update user stats
    await pool.query(
      "UPDATE users SET xp = $1, level = $2, badges = $3 WHERE id = $4",
      [newXP, newLevel, newBadges, userId]
    );

    res.status(201).json({
      message: "Action logged successfully.",
      action,
      xpGained,
      updatedUser: {
        id: user.id,
        email: user.email,
        username: user.username,
        xp: newXP,
        level: newLevel,
        badges: newBadges,
      },
    });
  } catch (error) {
    console.error("❌ Error logging action:", error);
    res.status(500).json({ message: "Server error while logging action." });
  }
};

// 📄 Get All Actions for a User
const getUserActions = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM actions WHERE user_id = $1 ORDER BY timestamp DESC",
      [userId]
    );

    res.status(200).json({ actions: result.rows });
  } catch (error) {
    console.error("❌ Error fetching actions:", error);
    res.status(500).json({ message: "Server error while fetching actions." });
  }
};

module.exports = {
  logAction,
  getUserActions,
};
