import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { ESLint } from "eslint";

import sharedConfig, { tsLanguageOptions } from "../index.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, "..");
const smokeDir = path.join(packageDir, "fixtures", "smoke");

const packageJson = JSON.parse(
  await readFile(path.join(packageDir, "package.json"), "utf8"),
);

assert.ok(Array.isArray(sharedConfig), "default export must be a config array");
assert.equal(
  typeof tsLanguageOptions,
  "function",
  "tsLanguageOptions must remain a named export",
);

const languageOptions = tsLanguageOptions({
  project: "./tsconfig.eslint.json",
  tsconfigRootDir: packageDir,
});

assert.equal(
  languageOptions?.parserOptions?.project,
  "./tsconfig.eslint.json",
  "tsLanguageOptions should pass through parserOptions.project",
);
assert.equal(
  languageOptions?.parserOptions?.tsconfigRootDir,
  packageDir,
  "tsLanguageOptions should pass through parserOptions.tsconfigRootDir",
);

assert.deepEqual(Object.keys(packageJson.peerDependencies).sort(), [
  "eslint",
  "prettier",
  "typescript",
]);
assert.equal(
  packageJson.peerDependencies.eslint,
  ">= 9.7 < 10",
  "eslint peer range must stay aligned with the React config package",
);
assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
  "@eslint/js",
  "eslint-config-prettier",
  "eslint-plugin-prettier",
  "globals",
  "typescript-eslint",
]);
assert.ok(
  packageJson.exports?.["."],
  "package exports must expose the root entry",
);

const eslint = new ESLint({
  cwd: smokeDir,
  ignore: false,
  overrideConfigFile: path.join(smokeDir, "eslint.config.mjs"),
});

const [result] = await eslint.lintFiles(["src/index.ts"]);

assert.equal(result.errorCount, 0, "smoke fixture should lint without errors");
assert.equal(
  result.warningCount,
  0,
  "smoke fixture should lint without warnings",
);
