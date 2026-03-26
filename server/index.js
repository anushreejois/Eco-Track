const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const pool = require("./db/connect");
const authRoutes = require("./routes/authRoutes");
const actionRoutes = require("./routes/actionRoutes"); // ✅ NEW

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/actions", actionRoutes); // ✅ NEW

// Test route
app.get("/", (req, res) => {
  res.send("EcoTrack Backend is running 🌱");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
