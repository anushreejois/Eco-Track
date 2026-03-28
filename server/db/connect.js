const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // 🔥 FORCE IPv4 (THIS IS THE REAL FIX)
  host: process.env.DATABASE_URL.split("@")[1].split(":")[0],
});

pool.on("connect", () => {
  console.log("✅ Connected to Supabase DB");
});

pool.on("error", (err) => {
  console.error("❌ DB error:", err);
});

module.exports = pool;