import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // ✅ Fix: React 17+ ne zahteva import
      "react/jsx-no-target-blank": ["warn", { allowReferrer: true }], // ⚠️ Warning umesto error-a
    },
    settings: {
      react: {
        version: "detect", // ✅ Fix: automatski detektuje verziju React-a
      },
    },
  },
];
