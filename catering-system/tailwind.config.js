/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',   // Orange color
        secondary: '#1f2937', // Dark gray/black
      }
    },
  },
  plugins: [],
}