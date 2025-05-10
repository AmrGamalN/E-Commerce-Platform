// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// We supply an empty object for recommendedConfig.
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { rules: {} },
});

// Get the extended configuration (this returns an array)
const extendedConfigs = compat.extends("next/core-web-vitals", "next/typescript", "eslint:recommended", "prettier");

// Convert your legacy config into flat config format
const legacyConfig = compat.config({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-uses-vars": "error",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "prefer-const": ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
});

// Combine the configs and flatten any nested arrays.
const finalConfig = [...extendedConfigs, legacyConfig].flat(Infinity);

export default finalConfig;
