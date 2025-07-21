import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import LogActionPage from "./pages/LogActionPage";
import ImpactSummaryPage from "./pages/ImpactSummaryPage";
import BadgesPage from "./pages/BadgesPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ActionHistory from "./components/ActionHistory";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Private Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/log" element={<PrivateRoute><LogActionPage /></PrivateRoute>} />
            <Route path="/impact" element={<PrivateRoute><ImpactSummaryPage /></PrivateRoute>} />
            <Route path="/badges" element={<PrivateRoute><BadgesPage /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/actions" element={<PrivateRoute><ActionHistory /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
