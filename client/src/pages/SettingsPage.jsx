/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, getAuthToken, logoutUser } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState({ email: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        });

        setUserData({
          email: res.data.user.email,
          username: res.data.user.username,
        });
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/profile`,
        userData,
        {
          headers: { Authorization: `Bearer ${getAuthToken()}` },
        }
      );

      toast.success("Profile updated!");
      setEditing(false);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account permanently?")) return;

    try {
      await axios.delete(`${BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });

      toast.success("Account deleted");
      logoutUser();
      navigate("/login");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-200 p-6">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {userData.username.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold mt-3 text-gray-700">
            {userData.username}
          </h2>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          ⚙️ Settings
        </h1>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="font-semibold text-gray-600">Email</label>
            <input
              type="email"
              value={userData.email}
              disabled={!editing}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className={`w-full mt-1 px-4 py-3 rounded-xl border transition ${
                editing
                  ? "bg-white focus:ring-2 focus:ring-orange-400"
                  : "bg-gray-100 opacity-70"
              }`}
            />
          </div>

          <div>
            <label className="font-semibold text-gray-600">Username</label>
            <input
              type="text"
              value={userData.username}
              disabled={!editing}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              className={`w-full mt-1 px-4 py-3 rounded-xl border transition ${
                editing
                  ? "bg-white focus:ring-2 focus:ring-orange-400"
                  : "bg-gray-100 opacity-70"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
              >
                ✅ Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-xl shadow hover:bg-gray-500 transition"
              >
                ❌ Cancel
              </button>
            </>
          )}

          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;