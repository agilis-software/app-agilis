/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#8d00ec',
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
          100: '#d5d5d5',
          200: '#acabab',
          300: '#828080',
          400: '#595656',
          500: '#2f2c2c',
          600: '#262323',
          700: '#1c1a1a',
          800: '#131212',
          900: '#090909',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '17px 35px 60px -15px rgba(0, 0, 0, 0.4)',
      },
      inset: {
        '-13': '-3.1rem'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
