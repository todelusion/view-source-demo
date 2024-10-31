/** @type {import('tailwindcss').Config} */

const { join } = require("path");

module.exports = {
  darkMode: ["class"],
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "24px",
      },
    },
    extend: {
      aspectRatio: {
        "4/3": "4 / 3",
      },
      boxShadow: {
        example: "0px 8px 16px rgba(244, 104, 10, 0.6)",
      },
    },
    fontFamily: {
      sans: ["Noto Sans TC", "sans-serif"],
      "barlow-condensed": ["Barlow Condensed", "sans-serif"],
    },
  },
};
