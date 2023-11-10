/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#FFFFFF",
        primary2: "#FCDA69",
        primary3: "#18171C",
        primary4: "#8873f0"
        primary5: "#B9F2FE"
      }
    }
  },
  plugins: []
});
