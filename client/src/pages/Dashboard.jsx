import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { BASE_URL, getAuthToken } from "../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ xp: 0, level: 1, badges: [] });
  const [impactSummary, setImpactSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/stats`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
    }
  };

  const fetchImpactSummary = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/summary`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setImpactSummary(res.data.summary);
    } catch (err) {
      console.error("❌ Error fetching summary:", err);
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      await fetchUserStats();
      await fetchImpactSummary();
      setLoading(false);
    };
    loadDashboard();
  }, []);

  const chartData = {
    labels: impactSummary.map((item) => item.action_type),
    datasets: [
      {
        data: impactSummary.map((item) =>
          parseFloat(item.total_amount)
        ),
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#facc15",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-200 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-8 text-green-800">
          🌱 EcoTrack Dashboard
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-500">Level</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.level}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-500">XP</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.xp}
            </p>

            {/* Progress bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${(stats.xp % 1000) / 10}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-500">Badges</p>
            <p className="text-3xl font-bold text-purple-600">
              {stats.badges.length}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-6 text-center">
            📊 Impact Summary
          </h2>

          {impactSummary.length === 0 ? (
            <p className="text-center text-gray-500">
              No actions logged yet.
            </p>
          ) : (
            <div className="max-w-sm mx-auto">
              <Pie data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;