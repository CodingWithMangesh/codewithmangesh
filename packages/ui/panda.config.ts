import { defineConfig, defineKeyframes } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  theme: {
    extend: {
      keyframes: defineKeyframes({
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      }),
    },
  },
  outdir: "styled-system",
});
