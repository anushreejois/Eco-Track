/** @type {import('tailwindcss').Config} */
module.exports = {
  // ✅ Enable dark mode via class strategy
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1.2s ease-out",
        "slide-up": "slideUp 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
