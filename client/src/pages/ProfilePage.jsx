import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../utils/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/api/profile", {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-lime-200 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">👤 Your Profile</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="space-y-4 text-left text-gray-700">
              <div>
                <span className="font-semibold">Username:</span> {user.username}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.email}
              </div>
              <div>
                <span className="font-semibold">Level:</span> {user.level}
              </div>
              <div>
                <span className="font-semibold">XP:</span> {user.xp}
              </div>
              <div>
                <span className="font-semibold">Badges:</span>{" "}
                {user.badges.length > 0 ? (
                  <ul className="list-disc list-inside mt-2">
                    {user.badges.map((badge, index) => (
                      <li key={index}>{badge}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-500">No badges yet</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
