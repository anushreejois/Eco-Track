// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { getAuthToken } from "../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ xp: 0, level: 1, badges: [] });
  const [impactSummary, setImpactSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/stats", {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
    }
  };

  const fetchImpactSummary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/summary", {
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
        label: "Total Impact",
        data: impactSummary.map((item) => parseFloat(item.total_amount)),
        backgroundColor: ["#22c55e", "#3b82f6", "#facc15", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500 text-xl">Loading Dashboard...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🌱 EcoTrack Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500">Level</p>
          <p className="text-2xl font-bold text-green-600">{stats.level}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500">XP</p>
          <p className="text-2xl font-bold text-green-600">{stats.xp}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500">Badges</p>
          <p className="text-2xl font-bold text-green-600">{stats.badges.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Impact Summary</h2>
        {impactSummary.length === 0 ? (
          <p className="text-gray-500">No actions logged yet.</p>
        ) : (
          <div className="max-w-md mx-auto">
            <Pie data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
