/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1CA69A',
        },
        secondary: {
          10: '#EDEDED',
          30: '#C8C8C8',
          50: '#A3A3A3',
          66: '#868686',
          DEFAULT: '#484848',
        },
        gray: {
          light: '#F5F5F8',
          dark: '#D4D4D7',
        },
        green: {
          accent: {
            10: '#EBFCFA',
            DEFAULT: '#37DDC9',
          },
        },
        yellow: {
          accent: '#FF9D21',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        error: '#E44461',
      },
    },
  },
  plugins: [],
};
