import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

const SOURCE_FILES = ["**/*.{ts,tsx,js,jsx,mjs,cjs}"];
const JS_SOURCE_FILES = ["**/*.{js,jsx,mjs,cjs}"];

const baseRules = {
  /* Bug detection rules */
  "@typescript-eslint/no-floating-promises": "off",
  "@typescript-eslint/no-misused-promises": "off",

  /* Safe runtime checks */
  "@typescript-eslint/no-unsafe-assignment": "warn",
  "@typescript-eslint/no-unsafe-call": "warn",
  "@typescript-eslint/no-unsafe-member-access": "warn",
  "@typescript-eslint/no-unsafe-return": "warn",
  "@typescript-eslint/no-unsafe-argument": "warn",

  /* Relaxed developer ergonomics */
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-var-requires": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",

  /* General JS hygiene */
  "no-console": "warn",
  "no-constant-condition": ["warn", { checkLoops: false }],
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "warn",
    {
      args: "all",
      argsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      varsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
};

const jsOnlyRuleOverrides = {
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-argument": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-require-imports": "off",
};

const prettierRules = {
  "prettier/prettier": [
    "warn",
    {
      semi: true,
      printWidth: 80,
      tabWidth: 2,
      singleQuote: false,
    },
  ],
};

export function tsLanguageOptions({
  tsconfigRootDir = process.cwd(),
  project = "./tsconfig.json",
} = {}) {
  return {
    parser: tseslint.parser,
    parserOptions: {
      project,
      tsconfigRootDir,
      ecmaVersion: "latest",
      sourceType: "module",
      allowJs: true,
    },
    globals: {
      ...globals.node,
      ...globals.browser,
    },
  };
}

const sharedConfig = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    name: "@easysql/eslint-config/base",
    files: SOURCE_FILES,
    languageOptions: tsLanguageOptions(),
    rules: baseRules,
  },
  {
    name: "@easysql/eslint-config/javascript-overrides",
    files: JS_SOURCE_FILES,
    languageOptions: {
      parserOptions: {
        allowJs: true,
      },
    },
    rules: jsOnlyRuleOverrides,
  },
  eslintPluginPrettierRecommended,
  {
    name: "@easysql/eslint-config/prettier",
    rules: prettierRules,
  },
);

export default sharedConfig;
