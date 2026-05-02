/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trail: {
          green: '#2D6A4F',
          lime:  '#74C69D',
          earth: '#A8763E',
          sky:   '#48CAE4',
          stone: '#F4F1DE',
        }
      }
    },
  },
  plugins: [],
}
