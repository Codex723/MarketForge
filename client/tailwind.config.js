/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fdf9f0",
          100: "#f9edd5",
          200: "#f0d4a0",
          300: "#e8d5b7",
          400: "#d4b07a",
          500: "#c9a96e",
          600: "#a07840",
          700: "#7d5e32",
          800: "#5c4425",
          900: "#3d2d18",
        },
        surface: {
          50: "#2a2a2d",
          100: "#1e1e21",
          200: "#161618",
          300: "#111113",
          400: "#0d0d0f",
          500: "#0a0a0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
