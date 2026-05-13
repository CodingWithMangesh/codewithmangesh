// Root-level ESLint config for a Turborepo cwm.
// App/package lint rules live in each cwm's eslint.config.js.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [
    "**/node_modules/**",
    "**/.next/**",
    "**/dist/**",
    "**/.turbo/**",
    "**/coverage/**",
  ],
}
