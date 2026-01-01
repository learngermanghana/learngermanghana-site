import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: "#052e2b",
          900: "#06423d",
          800: "#0b5a53",
          700: "#0f6f66",
          600: "#14857a",
          500: "#1a9b8e",
          200: "#bfeee7",
        },
        gold: {
          500: "#f59e0b",
          400: "#fbbf24",
          200: "#fde68a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
