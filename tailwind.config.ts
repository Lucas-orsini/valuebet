import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tennis: {
          50: "#fafde8",
          100: "#f0fbc4",
          200: "#e1f889",
          300: "#c8f14d",
          400: "#b4e81a",
          500: "#c8e614",
          600: "#a3bf0e",
          700: "#7a9109",
          800: "#526107",
          900: "#363d05",
          950: "#1a1f03",
        },
      },
    },
  },
  plugins: [],
};

export default config;
