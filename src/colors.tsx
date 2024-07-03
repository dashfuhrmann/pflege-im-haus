export const ColorsArray = [
  "primary",
  "secondary",
  "lightGray",
  "dunkelblau",
  "graublau",
  "default",
] as const;

export const ColorsMap = {
  primary: "#0e5082",
  secondary: "#88c6aa",
  lightGray: "#e2e8f0",
  dunkelblau: "#084a7b",
  graublau: "#5a7d96",
  default: "#fffffff",
} as const;

export type ColorsType = (typeof ColorsArray)[number];
