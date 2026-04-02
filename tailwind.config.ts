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
        background: "#050505",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#D4AF37", // A premium gold color
          dark: "#AA8C2C"
        },
        card: "#121212",
        "card-hover": "#1A1A1A",
        border: "#2A2A2A"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
