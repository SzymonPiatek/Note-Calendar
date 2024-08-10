import {
  colors,
  black,
  currentColor,
  transparent,
  white,
  inherit,
} from "./src/config/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    colors: {
      ...colors,
      white,
      black,
      transparent,
      currentColor,
      inherit,
    },
  },
  plugins: [],
};
