/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxHeight: {
        '105': '450px', // You can adjust this value
        '120': '120px', // Add the desired max height in pixels
      },
    },
  },
  plugins: [],
}