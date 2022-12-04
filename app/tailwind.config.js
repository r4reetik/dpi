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
        primary: "#6e28d9",
        white: "#FAFAFA",
        "black-900": "#111318",
        "black-800": "#1C1D21",
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
