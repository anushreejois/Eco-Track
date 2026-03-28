/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { BASE_URL } from "../utils/api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🌙 Dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // ✅ Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}/api/login`, {
        email: email.toLowerCase(), // ✅ fix case issue
        password,
      });

      const data = res.data;

      // ✅ Save token safely
      if (!data.token) {
        toast.error("Login failed: No token received");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // trigger navbar update
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful 🎉");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      // ✅ show real backend message
      const message =
        err.response?.data?.message ||
        "Login failed. Please check credentials.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-teal-50 via-indigo-100 to-pink-100 text-gray-800"
      } flex items-center justify-center p-4 relative`}
    >
      {/* 🌗 Dark Mode Toggle */}
      <button
        className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold shadow-md ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-700"
        }`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />

      {/* Card */}
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          🔒 EcoTrack
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Register */}
        <p className="text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-500 font-semibold cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;