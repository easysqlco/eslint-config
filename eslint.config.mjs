import eslintConfig from "./index.js";

// to lint itself with the same config
export default eslintConfig.map((config) => ({
  ...config,
  languageOptions: {
    ...(config.languageOptions ?? {}),
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      project: ["tsconfig.eslint.json"],
      tsconfigRootDir: ".",
    },
  },
}));
