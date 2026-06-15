import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  {
    extends: [...nextCoreWebVitals, ...nextTypescript],

    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "**/index.ts",
            "next/server",
            "next/navigation",
            "next/image",
            "@reduxjs/toolkit/query/react",
            "@reduxjs/toolkit/query",
            "next-intl/middleware",
            "next-intl/routing",
            "next-intl/server",
            "next-intl/navigation",
            "next/font/google",
            "/styles/globals.css",
            "next-intl/plugin",
            "next/constants.js",
          ],
        },
      ],
    },
  },
  {
    files: ["**/index.ts", "**/index.tsx"],

    rules: {
      "import/no-internal-modules": "off",
    },
  },
  {
    files: [
      "*.config.ts",
      "*.config.mjs",
      "eslint.config.mjs",
      "tailwind.config.ts",
    ],

    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "import/no-internal-modules": "off",
    },
  },
  {
    files: ["**/*.d.ts"],

    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  prettierConfig,
]);
