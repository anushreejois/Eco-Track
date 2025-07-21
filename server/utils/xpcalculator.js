// utils/xpCalculator.js

function calculateXP(actionType, amount) {
  const baseXP = {
    "Recycled Plastic": 10,
    "Saved Water": 8,
    "Planted Trees": 20,
    "Reduced Electricity": 12,
    "Bike Commute": 15,
  };

  const xpPerUnit = baseXP[actionType] || 5;
  return Math.floor(amount * xpPerUnit);
}

function determineLevel(xp) {
  return Math.floor(Math.sqrt(xp / 100)) + 1; // example formula
}

function assignBadges(xp, actionCount) {
  const badges = [];

  if (xp >= 1000) badges.push("Eco Hero 🦸‍♂️");
  if (actionCount >= 10) badges.push("Active 🌱");
  if (xp >= 500) badges.push("Green Warrior 🛡️");
  if (actionCount >= 5) badges.push("Eco Enthusiast 💚");

  return badges;
}

module.exports = {
  calculateXP,
  determineLevel,
  assignBadges,
};
