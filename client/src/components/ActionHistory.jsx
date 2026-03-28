import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, getAuthToken } from "../utils/api";

const ActionHistory = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/actions/history`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        setActions(response.data.actions);
      } catch (error) {
        console.error("❌ Error fetching action history:", error);
      }
    };

    fetchActions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-200 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
          🌿 Your Eco Actions
        </h2>

        {actions.length === 0 ? (
          <p className="text-center text-gray-500">No actions logged yet.</p>
        ) : (
          <table className="w-full text-left border-collapse mt-4">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Action</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action, index) => (
                <tr key={action.id} className="border-b hover:bg-teal-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{action.action_type}</td>
                  <td className="py-2 px-4">{action.amount}</td>
                  <td className="py-2 px-4">
                    {new Date(action.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ActionHistory;