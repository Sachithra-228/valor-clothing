import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        coal: "#101010",
        graphite: "#1f1f1f",
        ash: "#a7a7a7",
        bone: "#f4f1ec",
        silver: "#d8d8d8"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"]
      },
      boxShadow: {
        luxury: "0 28px 90px rgba(0,0,0,.38)",
        glow: "0 0 55px rgba(255,255,255,.12)"
      }
    }
  },
  plugins: []
};

export default config;
