import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BASE_URL } from "../utils/api";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f472b6", "#a78bfa", "#f87171"];

const ImpactSummaryPage = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchImpactSummary = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Parse amount as number
        const processed = res.data.summary.map(item => ({
          ...item,
          total_amount: parseFloat(item.total_amount),
        }));
        setSummary(processed);
      } catch (error) {
        console.error("❌ Error fetching impact summary: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactSummary();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">🌱 Your Eco Impact Summary</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : summary.length === 0 ? (
        <p className="text-center text-red-500">No actions logged yet.</p>
      ) : (
        <>
          {/* 💠 Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-green-200 rounded-lg p-5 shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-bold text-green-700">{item.action_type}</h3>
                <p className="text-gray-600">
                  Total: <span className="font-semibold text-green-600">{item.total_amount}</span> units
                </p>
              </div>
            ))}
          </div>

          {/* 📊 Pie + Bar Charts */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
            {/* 🍩 Pie Chart */}
            <div className="w-full lg:w-1/2 h-[300px]">
              <h3 className="text-xl font-semibold text-center text-indigo-700 mb-4">Contribution Pie Chart</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summary}
                    dataKey="total_amount"
                    nameKey="action_type"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {summary.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 📊 Bar Chart */}
            <div className="w-full lg:w-1/2 h-[300px]">
              <h3 className="text-xl font-semibold text-center text-indigo-700 mb-4">Action Totals Bar Graph</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary}>
                  <XAxis dataKey="action_type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total_amount" fill="#34d399" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImpactSummaryPage;
