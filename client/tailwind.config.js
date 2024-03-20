/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.{js,jsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
