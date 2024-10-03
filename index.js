import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['node_modules', 'dist', 'public'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 140,
          tabWidth: 2,
        },
      ],
      'no-console': 'error',
    },
  },
];
