import eslintConfig, { tsLanguageOptions } from "./index.js";

// to lint itself with the same config
export default [
  ...eslintConfig,
  {
    languageOptions: tsLanguageOptions({ project: "tsconfig.eslint.json" }),
  },
];
