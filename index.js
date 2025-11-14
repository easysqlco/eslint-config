// @ts-check
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/**
 * ESLint 9+ Flat Config
 * Tailored for mixed TS/JS projects with your tsconfig.json
 * - Modern NodeNext module resolution (ESM)
 * - Catch runtime bugs, but not stylistic nitpicks
 * - JS-friendly, allows `any`
 */

export default tseslint.config(
  // JavaScript base
  js.configs.recommended,

  // TypeScript base (type-aware, bug catching)
  ...tseslint.configs.recommendedTypeChecked,

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

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        allowJs: true,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    rules: {
      /* 🚨 Bug detection rules (keep strict) */
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/require-await": "warn",

      /* ⚙️ Safe runtime checks */
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",

      /* 😌 Relaxed developer ergonomics */
      "@typescript-eslint/no-explicit-any": "off", // your tsconfig already allows it
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-ignore": "allow-with-description" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      /* 🧹 General JS hygiene */
      "no-console": "off",
      "no-debugger": "warn",
      "no-constant-condition": ["warn", { checkLoops: false }],
      "no-unused-vars": "off", // replaced by TS version
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
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
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
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
      "no-console": "warn",
    },
  },
);
