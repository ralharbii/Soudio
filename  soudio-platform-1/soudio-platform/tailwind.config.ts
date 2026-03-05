import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0faf7",
          100: "#d1f0e6",
          200: "#a5e0cf",
          300: "#6fcab4",
          400: "#3daf94",
          500: "#1f9478",
          600: "#167560",
          700: "#145e4e",
          800: "#134b3f",
          900: "#113e35",
          950: "#082520",
        },
        accent: {
          50: "#fdf8f0",
          100: "#faecd6",
          200: "#f4d5a8",
          300: "#ecb871",
          400: "#e49641",
          500: "#c8763a",
          600: "#a85e2e",
          700: "#884826",
          800: "#6e3a22",
          900: "#5b311f",
        },
        neutral: {
          50: "#fafafa",
          100: "#f4f4f5",
          200: "#e4e4e7",
          300: "#d1d1d6",
          400: "#a0a0ab",
          500: "#70707b",
          600: "#52525c",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
        },
      },
      fontFamily: {
        arabic: ["Cairo", "IBM Plex Arabic", "Tajawal", "sans-serif"],
        display: ["Cairo", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "radial-gradient(ellipse at 70% 50%, #d1f0e6 0%, #f0faf7 40%, #ffffff 100%)",
        "section-pattern": "radial-gradient(ellipse at 30% 80%, #faecd6 0%, transparent 60%)",
      },
      boxShadow: {
        card: "0 2px 20px -4px rgba(0,0,0,0.08), 0 1px 4px -2px rgba(0,0,0,0.04)",
        "card-hover": "0 12px 40px -8px rgba(0,0,0,0.14), 0 4px 12px -4px rgba(0,0,0,0.06)",
        primary: "0 8px 32px -4px rgba(31, 148, 120, 0.35)",
        glow: "0 0 40px rgba(31, 148, 120, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
