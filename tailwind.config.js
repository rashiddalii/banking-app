/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'swiss-blue': '#0a2540',
        'swiss-light-blue': '#1e3a8a',
      }
    },
  },
  plugins: [],
}
