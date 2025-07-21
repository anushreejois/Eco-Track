import { Link } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-indigo-100 to-coral-100 text-center px-6 py-12 relative overflow-hidden">
      
      {/* 🍃 Floating Leaves */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`absolute leaf leaf-${i}`}
        >
          🍃
        </div>
      ))}

      {/* 🌍 Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto transition-opacity duration-1000 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-indigo-900 mb-4 flex items-center justify-center gap-2">
          <span className="text-coral-500 animate-pulse">🌍</span> EcoTrack
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
          Transform your daily actions into a force for good. Track eco-friendly habits, earn rewards, and join a global community of sustainability heroes.
        </p>
        <p className="text-lg md:text-xl text-gray-500 mb-8 italic">
          Every step counts—start your journey to a greener planet today!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Custom CSS for Leaves */}
      <style>{`
        .leaf {
          font-size: 1.5rem;
          position: absolute;
          top: -10%;
          animation: float 10s infinite linear;
          opacity: 0.6;
        }
        .leaf-0 { left: 10%; animation-delay: 0s; }
        .leaf-1 { left: 30%; animation-delay: 2s; }
        .leaf-2 { left: 50%; animation-delay: 4s; }
        .leaf-3 { left: 70%; animation-delay: 6s; }
        .leaf-4 { left: 90%; animation-delay: 8s; }

        @keyframes float {
          0% { transform: translateY(-10%) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(50vh) rotate(180deg); opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
