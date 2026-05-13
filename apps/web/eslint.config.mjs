import { defineConfig, globalIgnores } from "eslint/config"
import { nextJsConfig } from "@cwm/eslint-config/next-js"

/** @type {import('eslint').Linter.Config} */
const eslintConfig = defineConfig([
  nextJsConfig,
  {
    ignores: [
      "src/components/docs-sidebar/**",
      "src/components/toc/**",
      "src/layouts/**",
      "src/components/ui/collapsible.tsx",
    ],
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".source/**",
  ]),
])

export default eslintConfig
