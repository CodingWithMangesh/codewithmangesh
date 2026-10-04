import { cva } from "../../../styled-system/css/cva.js";

export const buttonVariants = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    rounded: "md",
    fontWeight: "semibold",
  },
  variants: {
    variant: {
      solid: { bg: "blue.500", color: "white" },
      outline: { borderWidth: "1px", borderColor: "blue.500" },
    },
    size: {
      sm: { px: "2", py: "1", fontSize: "sm" },
      md: { px: "4", py: "2", fontSize: "md" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});
