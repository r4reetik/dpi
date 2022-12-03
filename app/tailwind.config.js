const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PlusJakartaSans", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
      },
      colors: {
        primary: "#00ADB5",
        white: "#EEEEEE",
        "black-900": "#222831",
        "black-800": "#393E46",
      },
      spacing: {
        "630px": "630px",
        "550px": "550px",
      },
      screens: {
        xs: "400px",
      },
      borderRadius: {
        "32px": "32px",
      },
    },
  },
  safelist: ["bg-warning", "bg-error", "text-warning", "text-error"],
  plugins: [],
};
