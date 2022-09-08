/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    colors: {
      black: '#1E293B',
      white: '#FFFFFF',
      gray: {
        25: '#fcfcfd',
        50: '#f8f9fc',
        100: '#f2f4f8',
        200: '#ebeff5',
        300: '#e2e8f0',
        400: '#cad5e2',
        500: '#9aa8bc',
        600: '#8493a9',
        700: '#64748b',
        800: '#475569',
        900: '#334155',
      },
      blue: {
        100: '#e5f3ff',
        200: '#cce7ff',
        300: '#99d0ff',
        400: '#66b8ff',
        500: '#33a1ff',
        600: '#2490ef',
        700: '#006ecc',
        800: '#005299',
        900: '#003766',
      },
    },
  },
  plugins: [],
};
