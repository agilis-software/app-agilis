/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'electric-violet': {
          100: '#e8ccfb',
          200: '#d199f7',
          300: '#bb66f4',
          400: '#a433f0',
          500: '#8d00ec',
          600: '#7100bd',
          700: '#55008e',
          800: '#38005e',
          900: '#1c002f',
        },
        'eerie-black': {
          100: '#d2d2d2',
          200: '#a6a5a5',
          300: '#797878',
          400: '#4d4b4b',
          500: '#201e1e',
          600: '#1a1818',
          700: '#131212',
          800: '#0d0c0c',
          900: '#060606',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
