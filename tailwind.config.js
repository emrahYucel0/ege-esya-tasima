module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3b5d50',
          dark: '#314d43',
        },
        secondary: {
          DEFAULT: '#f9bf29',
          dark: '#f8b810',
        },
        dark: {
          DEFAULT: '#2f2f2f',
          light: '#6a6a6a',
        },
        background: '#eff2f1',
      },
      lineHeight: {
        '28': '28px',
      },
    },
  },
  plugins: [],
}