import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Use env variable instead of hardcoding
const BASE_URL = process.env.REACT_APP_API_URL;

const LogActionPage = () => {
  const [actionType, setActionType] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!actionType || !amount) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      // ✅ Get token safely
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/api/actions/log`,
        {
          action_type: actionType,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { xpGained, newLevel, badges } = response.data;

      // ✅ Safe update of user
      const user = JSON.parse(localStorage.getItem("user")) || {};

      const updatedUser = {
        ...user,
        xp: (user.xp || 0) + xpGained,
        level: newLevel,
        badges: badges,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success(`Action logged! +${xpGained} XP 🎉`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error("LOG ACTION ERROR:", error);

      // ✅ Better error handling
      if (error.response?.status === 403) {
        toast.error("Unauthorized. Please login again.");
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Failed to log action.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          🌿 Log Your Eco Action
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Action Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Action Type
            </label>
            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select an action</option>
              <option value="Recycled Plastic">♻️ Recycled Plastic</option>
              <option value="Saved Water">💧 Saved Water</option>
              <option value="Planted Trees">🌲 Planted Trees</option>
              <option value="Reduced Electricity">⚡ Reduced Electricity</option>
              <option value="Bike Commute">🚲 Bike Commute</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="e.g. 2.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Log Action
          </button>

        </form>
      </div>
    </div>
  );
};

export default LogActionPage;