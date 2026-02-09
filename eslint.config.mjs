import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import checkFile from "eslint-plugin-check-file";
import importPlugin from "eslint-plugin-import";

const compat = new FlatCompat();

const eslintConfig = defineConfig([
    // Next.js
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    // Main
    {
        plugins: {
            "check-file": checkFile,
            import: importPlugin,
        },
        rules: {
            // Formatting
            "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],

            // Files
            "check-file/filename-naming-convention": [
                "error",
                { "src/{components,hooks,lib,data}/**/*.{ts,tsx}": "KEBAB_CASE" },
                { ignoreMiddleExtensions: true },
            ],

            // Imports
            "import/order": [
                "error",
                {
                    alphabetize: { order: "asc", caseInsensitive: true },
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                    "newlines-between": "always",
                    pathGroups: [{ pattern: "@/**", group: "internal" }],
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],
            "sort-imports": ["error", { ignoreCase: true, ignoreDeclarationSort: true }],

            // React
            "react/no-unescaped-entities": "off",
            "react-hooks/set-state-in-effect": "off",

            // Next.js
            "@next/next/no-img-element": "off",

            // Additional quality rules
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-explicit-any": "warn",
            "prefer-const": "error",
        },
    },

    // Disable triple-slash-reference for generated files
    {
        files: ["next-env.d.ts"],
        rules: {
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },

    // Ignores
    globalIgnores(["out/**", ".next/**"]),

    // Prettier
    prettier,
]);

export default eslintConfig;