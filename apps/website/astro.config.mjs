// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import pandacss from "@pandacss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [pandacss()],
  },
});
