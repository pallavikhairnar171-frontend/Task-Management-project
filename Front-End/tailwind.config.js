/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
      primary: "var(--btn-primary-bg)",
      background: "var(--bg-main)",
      card: "var(--bg-card)",
      textPrimary: "var(--text-primary)",
    },
    },
  },
  plugins: [],
};