// src/pages/SettingsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken, logoutUser } from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState({ email: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getAuthToken();
      if (!token) {
        toast.error("No token found. Please log in again.");
        logoutUser();
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          email: res.data.user.email,
          username: res.data.user.username,
        });
      } catch (err) {
        toast.error("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async () => {
    if (!userData.email || !userData.username) {
      toast.error("Fields cannot be empty.");
      return;
    }

    try {
      await axios.put(
        "/api/profile",
        { ...userData },
        { headers: { Authorization: `Bearer ${getAuthToken()}` } }
      );
      toast.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    try {
      await axios.delete("/api/profile", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      toast.success("Account deleted.");
      logoutUser();
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 transition-all">
        <h1 className="text-3xl font-bold text-center text-amber-600 dark:text-amber-400 mb-6">
          ⚙️ Settings
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
        ) : (
          <>
            <div className="space-y-5">
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:text-white dark:border-gray-700 ${
                    !editing ? "cursor-not-allowed opacity-70" : ""
                  }`}
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 dark:text-white dark:border-gray-700 ${
                    !editing ? "cursor-not-allowed opacity-70" : ""
                  }`}
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  disabled={!editing}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-5 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleUpdate}
                    className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    ✅ Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-5 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                🗑️ Delete Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
