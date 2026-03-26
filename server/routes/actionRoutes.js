const express = require("express");
const router = express.Router();

const { logAction, getUserActions } = require("../controllers/ActionController");
const verifyToken = require("../middleware/authMiddleware"); // ✅ CORRECT IMPORT

router.post("/log", verifyToken, logAction);     // 🔐 Protected
router.get("/history", verifyToken, getUserActions);

module.exports = router;
