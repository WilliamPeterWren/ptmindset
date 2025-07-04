/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#93c5fd",
          DEFAULT: "#3b82f6",
          dark: "#1e40af",
        },
        customGreen: "#32CD32",
        customHeavyDark: "rgb(12, 12, 12)",
        customDark: "rgb(24, 24, 24)",
        customLightDark: "rgb(33, 33, 33)",
      },
    },
  },
  plugins: [],
};
