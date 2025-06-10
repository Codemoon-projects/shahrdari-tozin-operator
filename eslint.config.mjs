// eslint.config.mjs
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import NoraJsxStandard from "./rules/jsxCheck/index.js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";

export default [
  // ----------------------------------------------------- MAIN LINTERS
  js.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  // ----------------------------------------------------- DEPENDENCIES AND IMPORT LINTER
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",
      "import/no-dynamic-require": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/no-self-import": "error",
      "import/no-cycle": "error",
      "import/no-useless-path-segments": "error",
      "import/no-deprecated": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json", // مسیر tsconfig.json شما
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  // ----------------------------------------------------- NORA LINTER
  {
    plugins: {
      "@next/next": nextPlugin,
      NoraJsxStandard,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },
    files: ["app/**/*.ts", "app/**/*.tsx"],
    rules: {
      ...nextPlugin.configs.recommended.rules,
      "NoraJsxStandard/button-rules": "error",
      "NoraJsxStandard/link-rules": "error",
      "NoraJsxStandard/component-rules": "error",
    },
  },
];
