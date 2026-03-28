const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  family: 4, // 🔥 VERY IMPORTANT (fix IPv6 error)
});

pool.on("connect", () => {
  console.log("✅ Connected to Supabase DB");
});

pool.on("error", (err) => {
  console.error("❌ DB error:", err);
});

module.exports = pool;