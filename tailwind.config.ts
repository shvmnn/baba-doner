import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F0F0F",
        surface: "#1B1B1B",
        "surface-2": "#242424",
        fire: "#FF7A00",
        "fire-deep": "#D85F00",
        amber: "#FFD166",
        chili: "#E63946",
        "chili-deep": "#C42330",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        fire: "0 0 0 1px rgba(255,122,0,0.4), 0 16px 50px -12px rgba(255,122,0,0.55)",
        glow: "0 18px 60px -20px rgba(255,122,0,0.45)",
        card: "0 24px 60px -28px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grill-glow":
          "radial-gradient(ellipse at center, rgba(255,122,0,0.35) 0%, rgba(230,57,70,0.12) 40%, transparent 70%)",
        "hero-fade":
          "linear-gradient(180deg, rgba(15,15,15,0.35) 0%, rgba(15,15,15,0.55) 40%, rgba(15,15,15,0.97) 100%)",
        "fire-text":
          "linear-gradient(180deg, #FFD166 0%, #FF7A00 55%, #E63946 100%)",
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: "1" },
          "45%": { opacity: "0.86" },
          "55%": { opacity: "0.94" },
          "70%": { opacity: "0.8" },
        },
        "pulse-fire": {
          "0%": { boxShadow: "0 0 0 0 rgba(255,122,0,0.5)" },
          "70%": { boxShadow: "0 0 0 16px rgba(255,122,0,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,122,0,0)" },
        },
        "ember-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-120px) scale(0.4)", opacity: "0" },
        },
      },
      animation: {
        flicker: "flicker 3.5s infinite",
        "pulse-fire": "pulse-fire 2.4s infinite",
        "ember-rise": "ember-rise 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
