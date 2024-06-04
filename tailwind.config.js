/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFC75F",
        secondary: "#0081CF",
        tertiary: "#2A3F54",
        title_color_light: "#ffffff",
        subtitle_color_light: "##ecf0f1",
      },
    },
  },
  plugins: [],
}