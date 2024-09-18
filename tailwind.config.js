module.exports = {
  content: [
    `/components/**/*.{vue,js,ts}`,
    `/layouts/**/*.vue`,
    `/pages/**/*.vue`,
    `/composables/**/*.{js,ts}`,
    `/plugins/**/*.{js,ts}`,
    `/utils/**/*.{js,ts}`,
    `/App.{js,ts,vue}`,
    `/app.{js,ts,vue}`,
    `/Error.{js,ts,vue}`,
    `/error.{js,ts,vue}`,
    `/app.config.{js,ts}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: "Raleway",
        figtree: "Figtree",
      },
    },
  },
  daisyui: {
    themes: [
      {
        formula1: {
          primary: "#FF1801",
          "primary-focus": "#E61600",
          "primary-content": "#FFFFFF",

          secondary: "#FFFFFF",
          "secondary-focus": "#F5F5F5",
          "secondary-content": "#1E1E1E",

          accent: "#1E1E1E",
          "accent-focus": "#141414",
          "accent-content": "#FFFFFF",

          neutral: "#C0C0C0",
          "neutral-focus": "#A0A0A0",
          "neutral-content": "#1E1E1E",

          "base-100": "#F5F5F5",
          "base-200": "#E0E0E0",
          "base-300": "#C0C0C0",
          "base-content": "#1E1E1E",

          info: "#2094f3",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",
        },
      },
      "light",
      "dark",
      "cupcake",
      "lemonade",
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
