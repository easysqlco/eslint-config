type ConfigArray =
  import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray;
type LanguageOptions = import("eslint").Linter.LanguageOptions;
type ProjectOption = boolean | null | string | string[];

export declare function tsLanguageOptions(options?: {
  project?: ProjectOption;
  tsconfigRootDir?: string;
}): LanguageOptions;

declare const sharedConfig: ConfigArray;

export default sharedConfig;
