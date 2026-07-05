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
        background: "#050508",
        surface: "#0b0b12",
        "surface-2": "#11111c",
        border: "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.14)",
        muted: "#8b8fa3",
        foreground: "#f4f4f8",
        accent: {
          DEFAULT: "#7c6cf6",
          soft: "#a5a0ff",
          cyan: "#5eead4",
          blue: "#60a5fa"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "sans-serif"
        ]
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite"
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
