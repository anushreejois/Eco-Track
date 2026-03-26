import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // 🌙 Apply dark mode to the root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ✅ Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://eco-track-dsej.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Trigger authChange event so Navbar updates immediately
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful 🎉");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-teal-50 via-indigo-100 to-pink-100 text-gray-800"
      } flex items-center justify-center p-4 relative overflow-hidden`}
    >
      {/* 🌗 Dark Mode Toggle */}
      <button
        className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />

      {/* Login Card */}
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl border transition-all duration-500 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <span className="animate-pulse">🔒</span> EcoTrack
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-teal-400"
                  : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-teal-500"
              }`}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-teal-400"
                  : "bg-gray-50 border-gray-300 focus:ring-2 focus:ring-teal-500"
              }`}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Log In
          </button>
        </form>

        {/* Navigation to Register */}
        <p className="text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-teal-500 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
