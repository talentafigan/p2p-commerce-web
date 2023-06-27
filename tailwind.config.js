/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
    colors: ({ colors }) => ({
      ...colors,
      primary: "#e31e52",
    }),
  },
  plugins: [],
};
