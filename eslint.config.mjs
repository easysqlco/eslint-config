import eslintConfig, { useTSLanguageOptions } from "./index.js";

// to lint itself with the same config
export default eslintConfig.map((config) => ({
  ...config,
  languageOptions: useTSLanguageOptions({ project: "tsconfig.eslint.json" }),
}));
