import pluginJs from "@eslint/js";
import nextConfig from "eslint-config-next";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", ".next/", "dist/"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [
      pluginJs.configs.recommended,
      ...nextConfig(["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"]),
    ],
    rules: {
      "react/jsx-props-no-spreading": "off",
    },
  },
];

