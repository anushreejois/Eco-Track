import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, getAuthToken } from "../utils/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      setError("Failed to fetch profile.");
      console.error("❌ Profile Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-100 to-lime-200 p-6">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8">

        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold text-emerald-700 mt-4">
            {user.username}
          </h1>

          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Level</p>
            <p className="text-xl font-bold text-green-600">
              {user.level}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">XP</p>
            <p className="text-xl font-bold text-blue-600">
              {user.xp}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-gray-500 text-sm">Badges</p>
            <p className="text-xl font-bold text-purple-600">
              {user.badges.length}
            </p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Progress to next level
          </p>
          <div className="h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              style={{ width: `${(user.xp % 1000) / 10}%` }}
            ></div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-lg font-semibold text-emerald-700 mb-3">
            🏅 Achievements
          </h2>

          {user.badges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {user.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-full text-sm shadow-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No badges yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;