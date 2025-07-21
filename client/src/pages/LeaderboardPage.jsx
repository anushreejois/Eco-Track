// src/pages/LeaderboardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("/api/leaderboard");
        setLeaders(res.data.leaderboard);
      } catch (err) {
        console.error("❌ Failed to fetch leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">🏆 Eco Leaderboard</h1>

        {loading ? (
          <p className="text-gray-500">Loading leaderboard...</p>
        ) : leaders.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <table className="w-full table-auto mt-4 border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800">
                <th className="p-2 border">Rank</th>
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Level</th>
                <th className="p-2 border">XP</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => (
                <tr key={index} className="hover:bg-indigo-50">
                  <td className="p-2 border font-semibold">{getMedal(index)}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">{user.level}</td>
                  <td className="p-2 border">{user.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
