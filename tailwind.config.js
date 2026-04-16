/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Fraunces", "serif"],
      },
      colors: {
        amber: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706",
        },
        crimson: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },
        brand: {
          dark: "#0A0A0F",
          dark2: "#111118",
          dark3: "#1A1A24",
          light: "#FAF8F3",
          light2: "#F3F0E8",
        },
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "float-fast": "float-fast 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        marquee: "marquee 20s linear infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        lightning: "lightning-bolt 4s ease-in-out infinite",
        "slide-up": "slideInUp 0.6s cubic-bezier(0.23,1,0.32,1) forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.23,1,0.32,1) forwards",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-12px) rotate(1deg)" },
          "66%": { transform: "translateY(-6px) rotate(-1deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "lightning-bolt": {
          "0%": { transform: "translateY(-100%) scaleX(0.5)", opacity: "0" },
          "10%": { opacity: "1", transform: "translateY(0) scaleX(1)" },
          "40%": { opacity: "0.6" },
          "100%": { transform: "translateY(100%) scaleX(0.3)", opacity: "0" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "neon-amber":
          "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.2)",
        "neon-crimson":
          "0 0 20px rgba(239,68,68,0.4), 0 0 40px rgba(239,68,68,0.2)",
        glass:
          "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        "glass-light":
          "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
      },
    },
  },
  plugins: [],
};
