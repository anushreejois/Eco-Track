import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/log", label: "Log Action" },
    { to: "/actions", label: "Action History" },
    { to: "/impact", label: "Impact Summary" },
    { to: "/badges", label: "Badges" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md p-4 hidden md:block">
      <h1 className="text-2xl font-bold text-green-700 mb-6">EcoTrack 🌱</h1>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-green-700 dark:text-green-400 font-bold"
                  : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
