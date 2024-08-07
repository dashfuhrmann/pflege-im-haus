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
        secondary50: "rgba(136, 198, 170, 0.5)",
        lightGray: "#e2e8f0",
        dunkelblau: "#084a7b",
        graublau: "#5a7d96",
        default: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-roboto)"],
      },
      maxHeight: {
        0: "0",
        full: "100vh",
      },
      transitionProperty: {
        maxHeight: "max-height",
      },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
  plugins: [require("tailwindcss-react-aria-components")],
};
