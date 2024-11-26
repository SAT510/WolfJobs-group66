import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{ts,tsx}"], // Apply this config to TypeScript files
    languageOptions: {
      parser: tsParser, // Use the TypeScript parser
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
        project: "./tsconfig.json", // Ensure the TypeScript config is used
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules, // Include recommended rules
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Apply this config to JavaScript files
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable this rule
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"], // Apply this to all files
    rules: {
      "react/react-in-jsx-scope": "off", // Disable the rule for React 17+
    },
  },
];
