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
        lightGray: "#e2e8f0",
        dunkelblau: "#084a7b",
        graublau: "#5a7d96",
        default: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-hk-grotesk)"],
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
  plugins: [require("tailwindcss-react-aria-components")],
};
