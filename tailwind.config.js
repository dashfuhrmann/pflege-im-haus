/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0e5082",
        secondary: "#88c6aa",
        hellgrün: "#8ac8ad",
        grau: "#b0b5b5",
        dunkelblau: "#084a7b",
        graublau: "#5a7d96",
        white: "#ffffff",
        gray: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-hk-grotesk)"],
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
  plugins: [require("tailwindcss-react-aria-components")],
};
