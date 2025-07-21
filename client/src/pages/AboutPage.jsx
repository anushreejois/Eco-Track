import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-100 to-green-100 flex flex-col items-center justify-center text-center p-10 overflow-hidden relative">
      
      {/* 🍃 Floating BG Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.2%22%3E%3Cpath d=%22M50 50c0-5.52-4.48-10-10-10s-10 4.48-10 10 4.48 10 10 10 10-4.48 10-10zm-30-30c0-5.52-4.48-10-10-10S0 14.48 0 20s4.48 10 10 10 10-4.48 10-10zm60 0c0-5.52-4.48-10-10-10s-10 4.48-10 10 4.48 10 10 10 10-4.48 10-10z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      {/* Main Text */}
      <div className="relative z-10 max-w-4xl animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">About EcoTrack 🌍</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          EcoTrack is your companion in building sustainable habits. We help you track eco-friendly actions, earn rewards, and be part of a global impact movement. 💚
        </p>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">♻️ Track Actions</h2>
            <p className="text-gray-600">Log your recycling, water savings, green commute, and more!</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">💎 Earn XP & Badges</h2>
            <p className="text-gray-600">Get rewarded for eco-efforts with XP points and cool badges.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">📊 View Impact</h2>
            <p className="text-gray-600">Visualize your carbon savings, water saved, and trees helped.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">🏆 Level Up</h2>
            <p className="text-gray-600">Every eco-action increases your level and unlocks new goals.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">🌐 Global Leaderboard</h2>
            <p className="text-gray-600">Compete and collaborate with others around the world.</p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-all">
            <h2 className="text-xl font-bold text-green-700 mb-2">🌱 Real Habits</h2>
            <p className="text-gray-600">EcoTrack isn’t just an app—it’s a lifestyle. Change starts with you.</p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
