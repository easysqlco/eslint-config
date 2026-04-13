import path from "node:path";
import { fileURLToPath } from "node:url";
import easySqlConfig, { tsLanguageOptions } from "../../index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...easySqlConfig,
  {
    languageOptions: tsLanguageOptions({
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
    }),
  },
];
