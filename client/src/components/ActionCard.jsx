import React from "react";

const ActionCard = ({ action }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <p className="text-gray-600">
        <strong>Type:</strong> {action.action_type}
      </p>
      <p className="text-gray-600">
        <strong>Amount:</strong> {action.amount}
      </p>
      <p className="text-gray-400 text-sm">{new Date(action.timestamp).toLocaleString()}</p>
    </div>
  );
};

export default ActionCard;
