/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#5A5959",
        red: "#D01C28",
        yellow: "#FFEAAE",
        purple: "#5F00D9",
        white: "#FFFFFF",
      }
    },
  },
  plugins: [],
}

