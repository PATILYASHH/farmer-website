/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#faf5f0',
          100: '#f5ebe0',
          200: '#e8d4bf',
          300: '#d4b59e',
          400: '#c09677',
          500: '#a67c52',
          600: '#8b6644',
          700: '#6d4f36',
          800: '#583f2c',
          900: '#4a3425',
        },
      },
    },
  },
  plugins: [],
}
