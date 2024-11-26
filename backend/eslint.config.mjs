import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Apply to JS, TS, and JSX files
    rules: {
      // Disable the `@typescript-eslint/no-require-imports` rule for JS and TS files
      "@typescript-eslint/no-require-imports": "off",

      // Disable the `no-undef` rule globally
      "no-undef": "off",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Apply to JS, TS, and JSX files
    languageOptions: {
      globals: {
        ...globals.browser, // Default browser globals
        require: "readonly", // Add `require` as a global variable
        module: "readonly", // Add `module` as a global variable
      },
    },
  },
  pluginJs.configs.recommended, // JavaScript recommended settings
  ...tseslint.configs.recommended, // TypeScript recommended settings
  pluginReact.configs.flat.recommended, // React settings
];
