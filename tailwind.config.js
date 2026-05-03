/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        trail: {
          green: '#2D6A4F',
          dark:  '#1B4332',
          moss:  '#52796F',
          lime:  '#74C69D',
          earth: '#8B5E3C',
          bark:  '#4A3728',
          sky:   '#0096C7',
          sand:  '#F5EDD6',
          stone: '#EDF2EE',
          mist:  '#F0F7F1',
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(27,67,50,0.55) 0%, rgba(27,67,50,0.75) 100%)',
      },
    },
  },
  plugins: [],
}
