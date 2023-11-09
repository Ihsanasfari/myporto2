/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary4: "#8873EF"
      }
    }
  },
  plugins: []
};
