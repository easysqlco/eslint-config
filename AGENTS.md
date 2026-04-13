# AGENTS.md

## Purpose

- `@easysql/eslint-config` is the shared ESLint + Prettier flat config for
  EasySQL's Node-oriented packages.
- Treat it as tooling infrastructure. Consumer lint behavior is a stable
  contract.

## Stability

- Do not change rule intent, severity, or defaults unless required for
  correctness.
- Do not add opinionated rule churn.
- Preserve the default export shape as a flat-config array.
- Preserve the `tsLanguageOptions` helper contract unless a breaking change is
  explicitly approved.

## Dependency Rules

- Keep `eslint` in `peerDependencies` with the broadest compatible range.
- Keep host tools that consumers already own in `peerDependencies`
  (`typescript`, `prettier`).
- Keep imported parser/plugin/config packages in `dependencies`, not peers.
- Do not introduce version ranges that conflict with
  `@easysql/eslint-config-react`.

## Cross-Package Consistency

- Align package metadata and export conventions with
  `@easysql/eslint-config-react` and `@easysqlco/tsconfig` where practical.
- Shared tooling packages should expose explicit `exports`, predictable `files`,
  and consistent documentation style.
- Changes here must be checked against sibling tooling packages before release.

## Validation

- Maintain lightweight validation for:
  - import/export resolution
  - flat-config smoke usage
  - dependency and peer-dependency shape
  - pack output sanity
- Prefer simple local scripts and CI over heavy test harnesses.

## Extension Rules

- New plugins or parsers require verified documentation first.
- Add new plugin integration only when multiple EasySQL packages need it.
- Keep new exports minimal and documented.

## Anti-Patterns

- Do not move app-specific lint rules into this package.
- Do not add config factories for convenience alone.
- Do not rely on undocumented subpath exports from dependencies.
- Do not couple this package to React-specific behavior.
