import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // 🧠 Handle login/logout reactivity
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkLogin);
    window.addEventListener("authChange", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("authChange", checkLogin);
    };
  }, []);

  // 🌗 Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // 🚪 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    setIsOpen(false); // close mobile menu
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
  ];

  const privateLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/log", label: "Log Action" },
    { to: "/impact", label: "Impact" },
    { to: "/actions", label: "History" },
    { to: "/badges", label: "Badges" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
  ];

  const linksToShow = isLoggedIn ? privateLinks : publicLinks;

  return (
    <nav className="bg-green-600 dark:bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-lg relative z-30">
      <Link to="/" className="text-xl font-bold flex items-center gap-2">
        <span className="text-2xl">🌱</span> EcoTrack
      </Link>

      {/* 📱 Mobile Toggle */}
      <div className="md:hidden flex items-center gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button onClick={toggleMenu} className="text-2xl">
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* 💻 Desktop Menu */}
      <div className="hidden md:flex items-center gap-4">
        {linksToShow.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:text-emerald-200"
          >
            {link.label}
          </Link>
        ))}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-white text-green-600 font-semibold px-3 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 text-xl"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-700 dark:bg-gray-800 p-4 z-20 flex flex-col gap-3 text-white md:hidden transition-all">
          {linksToShow.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => {
                setIsOpen(false);
              }}
              className="hover:text-emerald-200"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 font-semibold px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
