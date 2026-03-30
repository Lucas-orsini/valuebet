import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#f97316",
          light: "#fb923c",
          dark: "#ea580c",
        },
        background: "#09090b",
        surface: "#18181b",
        border: "#27272a",
        "text-primary": "#fafafa",
        "text-secondary": "#a1a1aa",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "counter-up": "counter-up 2s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "counter-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, #f97316 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
