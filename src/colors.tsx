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
  default: "#fffffff",
  black: "#000000",
} as const;

export type ColorsType = (typeof ColorsArray)[number];
