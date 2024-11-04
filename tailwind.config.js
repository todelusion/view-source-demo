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
        DEFAULT: "16px",
        "3xl": "32px",
      },
    },
    extend: {
      screens: {
        "3xl": "1600px",
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        19: "4.75rem",
        22: "5.5rem",
        30: "7.5rem",
        42: "10.5rem",
        50: "12.5rem",
        70: "17.5rem",
        100: "25rem",
        113: "28.25rem",
        120: "30rem",
        160: "40rem",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
      boxShadow: {
        example: "0px 8px 16px rgba(244, 104, 10, 0.6)",
      },
      colors: {
        "LOCAVORE-BLACK": "#000000",
        "LOCAVORE-NEWSPRINT": "#F3F1ED",
        "LOCAVORE-PAPER-WHITE": "#FFFCF6",
        "LOCAVORE-POST-IT-GREEN": "#DAFFBD",
      },
      rotate: {
        7: "7deg",
      },
    },
    fontFamily: {
      "pp-neue": ["PP Neue Montreal", "sans-serif"],
      "fake-receipt": ["Fake Receipt", "sans-serif"],
      "arial-rounded": ["Arial Rounded Bold", "sans-serif"],
    },
  },
};
