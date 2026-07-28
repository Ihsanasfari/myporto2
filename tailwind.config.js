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
        /* --- Base surfaces --- */
        background: "#F8F8F8",
        surface: "#FFFFFF",
        "surface-2": "#E7E6E4",
        "surface-alt": "#E7E6E4",

        /* --- Text --- */
        foreground: "#222222",
        muted: "#4E4E4E",
        "muted-soft": "#A7A7A7",

        /* --- Lines --- */
        border: "#DEDEDE",
        "border-strong": "#C1C1C1",

        /* --- Neutral scale --- */
        gray: {
          900: "#000000",
          800: "#222222",
          700: "#2C2C2C",
          600: "#3E3E3E",
          500: "#4E4E4E",
          400: "#A7A7A7",
          300: "#C1C1C1",
          200: "#DEDEDE",
          150: "#EDEDED",
          100: "#F0F0F0",
          50: "#FFFFFF"
        },

        /* --- Accent (yellow): highlights, active states, one CTA --- */
        accent: {
          DEFAULT: "#EBE234",
          soft: "#FFF083",
          btn: "#FCF083",
          /* legacy aliases kept so pre-redesign routes still compile */
          cyan: "#3E3E3E",
          blue: "#2C2C2C"
        },

        /* --- Ink (near-black buttons / high emphasis) --- */
        ink: {
          DEFAULT: "#0F0F17",
          secondary: "#222222",
          tertiary: "#3E3E3E"
        }
      },
      borderRadius: {
        card: "1.25rem",
        "card-lg": "1.75rem"
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)",
        lift: "0 10px 30px rgba(0,0,0,0.07)"
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" }
        ]
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "sans-serif"
        ]
      },
      maxWidth: {
        prose: "38rem"
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
