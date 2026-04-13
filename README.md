# @easysqlco/eslint-config

Shared ESLint flat config for EasySQL Node-oriented packages.

This package keeps the current lint policy stable and bundles the parser/plugin
packages it imports. Consumers only need the host tools: `eslint`,
`typescript`, and `prettier`.

## Installation

```bash
npm install --save-dev @easysqlco/eslint-config eslint prettier typescript
```

## Usage

Create `eslint.config.mjs` in the consuming package:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";
import easySqlConfig, { tsLanguageOptions } from "@easysqlco/eslint-config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...easySqlConfig,
  {
    languageOptions: tsLanguageOptions({
      project: "tsconfig.eslint.json",
      tsconfigRootDir: __dirname,
    }),
  },
];
```

`tsLanguageOptions()` defaults to `./tsconfig.json` relative to the current
working directory. Override it when your lint config should use a dedicated
`tsconfig.eslint.json` or a different root directory.

For React packages, compose this config with
`@easysqlco/eslint-config-react`.
