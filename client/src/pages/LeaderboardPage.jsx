import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/leaderboard`);
        setLeaders(res.data?.leaderboard || []);
      } catch (err) {
        console.error("❌ Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          🏆 Eco Leaderboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading leaderboard...</p>
        ) : leaders.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <>
            {/* 🥇 Top 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {leaders.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl text-center shadow-lg transform hover:scale-105 transition 
                  ${
                    index === 0
                      ? "bg-yellow-300"
                      : index === 1
                      ? "bg-gray-300"
                      : "bg-orange-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{medals[index]}</div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-sm">Level {user.level}</p>
                  <p className="font-semibold">{user.xp} XP</p>
                </div>
              ))}
            </div>

            {/* 📋 Rest of leaderboard */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-4">
              {leaders.slice(3).map((user, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 border-b last:border-none hover:bg-indigo-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-indigo-600 text-lg">
  {index + 4}.
</span>
                    <span className="font-medium">{user.username}</span>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <span className="text-gray-600">
                      Level {user.level}
                    </span>
                    <span className="font-semibold text-indigo-700">
                      {user.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;