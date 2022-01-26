const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xxs': '375px',
      'xs': '425px',
      ...defaultTheme.screens,
    },
    extend: {
      rotate: {
        '24': '24deg'
      },
      height: {
        '128': '32rem',
        '132': '33rem',
        '180': '45rem'
      },
      minHeight: {
        ...defaultTheme.spacing
      }
    },
  },
  plugins: [],
}
