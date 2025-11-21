import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export function useTSLanguageOptions({
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

/**
 * ESLint 9+ Flat Config
 * Tailored for mixed TS/JS projects with your tsconfig.json
 * - Modern NodeNext module resolution (ESM)
 * - Catch runtime bugs, but not stylistic nitpicks
 * - JS-friendly, allows `any`
 */

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Project config
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "public/**",
      "**/*.d.ts",
    ],

    languageOptions: useTSLanguageOptions(),

    rules: {
      /* 🚨 Bug detection rules */
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",

      /* ⚙️ Safe runtime checks */
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      /* 😌 Relaxed developer ergonomics */
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      /* 🧹 General JS hygiene */
      "no-console": "warn",
      "no-constant-condition": ["warn", { checkLoops: false }],
      "no-unused-vars": "off", // replaced by TS version
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
    },
  },

  // JS-only override — make pure JS files more lenient
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        allowJs: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          printWidth: 80,
          tabWidth: 2,
          singleQuote: false, // use double quotes
        },
      ],
    },
  },
);
