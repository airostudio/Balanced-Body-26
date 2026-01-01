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
          50: '#fff8f0',
          100: '#ffefd9',
          200: '#ffddb3',
          300: '#ffc78c',
          400: '#ffb166',
          500: '#ff9b40', // Main warm orange
          600: '#f58320',
          700: '#cc6a18',
          800: '#a35513',
          900: '#7a400e',
        },
        accent: {
          50: '#f5f3f0',
          100: '#e8e3dc',
          200: '#d4cabe',
          300: '#c0b1a0',
          400: '#ac9882',
          500: '#988064', // Warm tan/beige
          600: '#7d6850',
          700: '#62503d',
          800: '#47382a',
          900: '#2c2017',
        },
        earth: {
          50: '#f9f7f4',
          100: '#f0ebe3',
          200: '#e1d7c7',
          300: '#d2c3ab',
          400: '#c3af8f',
          500: '#b49b73', // Earth brown
          600: '#947f5e',
          700: '#746349',
          800: '#544734',
          900: '#342b1f',
        },
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(255, 155, 64, 0.3)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
