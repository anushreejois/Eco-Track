// src/pages/BadgesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BadgeDisplay from "../components/BadgeDisplay";
import { getAuthToken } from "../utils/api";

const BadgesPage = () => {
  const [userData, setUserData] = useState({ badges: [], xp: 0, level: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get("https://eco-track-dsej.onrender.com/api/user/stats", {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });
        setUserData(res.data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("❌ Badge Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold text-teal-700 mb-4">🏆 Your Eco Stats</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-lg text-gray-700 mb-2">
              🌱 Level: <span className="font-semibold">{userData.level}</span>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              ⭐ XP: <span className="font-semibold">{userData.xp}</span>
            </p>

            <h2 className="text-2xl font-semibold text-green-700 mb-2">Your Badges:</h2>

            {userData.badges.length === 0 ? (
              <p className="text-gray-500">No badges earned yet.</p>
            ) : (
              <BadgeDisplay badges={userData.badges} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BadgesPage;
