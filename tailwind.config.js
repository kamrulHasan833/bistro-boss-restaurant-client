/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#D99904",
        "secondary-color": "#1F2937",
        "title-color": "#151515",
        "active-color": "#EEFF25",
        "desc-color": "#737373",
        "border-color": "#E8E8E8",
        "price-color": "#BB8506",
        "card-bg": "#F3F3F3",
        "submit-color": "rgba(209, 160, 84, 0.70)",
        "icon-color": "#444",
        "dashboard-bg": "#F6F6F6",
        "placeholder-color": "#A1A1A1",
      },
      fontFamily: {
        inter: "'Inter', sans-serif",
        cinzel: "'Cinzel', serif",
      },
      maxWidth: {
        standard: "82.5rem",
        small: "68.5rem",
        large: "120rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
