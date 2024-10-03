# EasySQL eslint-config
This package exports common ESLint and Prettier configuration used by EasySQL packages.

## Usage
- Install this package as dev dependency

```bash
npm i -D @easysql/eslint-config
```

- Create `eslint.config.mjs` in the project root and add shared config

```js
import eslintConfigEasySQL from '@easysql/eslint-config';

export default [
  ...eslintConfigEasySQL,
  {
    rules: {
      // Add your own rules here
    }
  }
];
```

#### To generate .d.ts files from .js files
Generate types of js files and add them to package.json otherwise ts compiler gets angry when use this package in a ts project!

https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html
