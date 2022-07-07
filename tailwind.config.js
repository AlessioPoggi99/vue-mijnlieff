module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        screens: {
            'betterhover': {'raw': '(hover: hover)'},
        }
    }
  },
  plugins: [],
}