import React from "react";

const LeaderboardCard = ({ user, rank }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md flex justify-between items-center mb-3">
      <div>
        <h3 className="text-lg font-bold text-green-700">
          #{rank} {user.username}
        </h3>
        <p className="text-gray-500">XP: {user.xp}</p>
      </div>
      <div className="text-green-500 font-bold">Level {user.level}</div>
    </div>
  );
};

export default LeaderboardCard;
