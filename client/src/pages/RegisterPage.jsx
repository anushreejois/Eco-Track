import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Registration successful 🎉");

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-green-50 via-emerald-100 to-teal-200 text-gray-800"} flex items-center justify-center p-4 relative overflow-hidden`}>

      {/* 🌙 Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 px-4 py-2 flex items-center gap-2 rounded-full font-semibold shadow-md z-20 transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span
          className={`transition-transform duration-500 ease-in-out transform ${
            darkMode ? "rotate-180" : "rotate-0"
          }`}
        >
          {darkMode ? "☀️" : "🌙"}
        </span>
        {darkMode ? "Light" : "Dark"}
      </button>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} theme={darkMode ? "dark" : "light"} />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v4h-4v2h4v4h2v-4h4v-2h-4V0h-2zM6 34H2v2h4v4h2v-4h4v-2H8v-4H6v4zm0-30v4H2v2h4v4h2V6h4V4H8V0H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 pointer-events-none" />

      {/* Card */}
      <div className={`w-full max-w-lg p-10 rounded-3xl shadow-2xl border transform transition-all duration-500 z-10 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      }`}>

        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <span className="animate-pulse">⚡️</span> EcoTrack
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full px-5 py-3 rounded-xl border shadow-inner transition-all focus:outline-none ${
                darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-green-400" : "bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-400 hover:bg-gray-100"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="your_username"
              className={`w-full px-5 py-3 rounded-xl border shadow-inner transition-all focus:outline-none ${
                darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-green-400" : "bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-400 hover:bg-gray-100"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className={`w-full px-5 py-3 rounded-xl border shadow-inner transition-all focus:outline-none ${
                darkMode ? "bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-green-400" : "bg-gray-50 border-gray-200 focus:ring-2 focus:ring-green-400 hover:bg-gray-100"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 font-semibold hover:text-green-500 hover:underline cursor-pointer"
          >
            Log in here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
