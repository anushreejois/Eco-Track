import React from "react";

const BadgeDisplay = ({ badges }) => {
  if (!badges.length) return <p className="text-gray-500">No badges earned yet.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {badges.map((badge, idx) => (
        <div key={idx} className="bg-green-100 text-green-800 px-3 py-2 rounded shadow text-center font-semibold">
          {badge}
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
