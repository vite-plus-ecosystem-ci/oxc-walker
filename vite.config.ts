import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  resolve: {
    alias: {
      "oxc-walker": fileURLToPath(new URL("./src/index.ts", import.meta.url).href),
    },
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://release-v1-0-0-rc-0-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    coverage: {
      include: ["src"],
      reporter: ["text", "json", "html"],
    },
  },
  fmt: {
    ignorePatterns: ["CHANGELOG.md"],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        files: ["test/walker.test.ts", "test/scope-tracker.test.ts"],
        rules: {
          "@typescript-eslint/no-base-to-string": "off",
          "@typescript-eslint/restrict-template-expressions": "off",
        },
      },
    ],
  },
});
