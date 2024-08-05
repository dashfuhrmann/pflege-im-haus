export const ColorsArray = [
  "primary",
  "secondary",
  "secondary50",
  "lightGray",
  "dunkelblau",
  "graublau",
  "default",
  "black",
] as const;

export const ColorsMap = {
  primary: "#0e5082",
  secondary: "#88c6aa",
  secondary50: "rgba(136, 198, 170, 0.5)",
  lightGray: "#e2e8f0",
  dunkelblau: "#084a7b",
  graublau: "#5a7d96",
  default: "#ffffff",
  black: "#000000",
} as const;



export type ColorsType = (typeof ColorsArray)[number];


export const PrismicColorsArray = [
  "primary",
  "secondary",
  "secondary50",
  "lightGray",
  "default",
] as const;

export const PrismicColors = {
  primary: "#0e5082",
  secondary: "#88c6aa",
  secondary50: "rgba(136, 198, 170, 0.5)",
  lightGray: "#e2e8f0",
  default: "#ffffff",
} as const;


export type PrismicColorsType = (typeof PrismicColorsArray)[number];