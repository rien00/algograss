import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grass: {
          50: "#f0fdf4",
          100: "#dcfce7",
          300: "#86efac",
          500: "#22c55e",
          700: "#15803d",
        },
        ink: "#172033",
      },
    },
  },
  plugins: [],
};

export default config;
