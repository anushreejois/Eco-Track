const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const actionRoutes = require("./routes/actionRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/actions", actionRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("EcoTrack Backend is running 🌱");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});