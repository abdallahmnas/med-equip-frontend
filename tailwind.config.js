/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D6EAEA", // Main primary color
          // light: "#4AD991", // Optional lighter shade
          dark: "#297F7F", // Optional darker shade
        },
        // secondary: {
        //   DEFAULT: "#F59E0B", // Main secondary color
        //   light: "#FBBF24", // Optional lighter shade
        //   dark: "#B45309", // Optional darker shade
        // },
      },
    },
  },
  plugins: [],
};
