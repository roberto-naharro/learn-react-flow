import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import * as reactHooksPlugin from 'eslint-plugin-react-hooks';
import { configs as tsConfigs } from 'typescript-eslint';

export default [
  {
    ignores: [
      // Ignore all dot directories
      '**/.*/**',
      '**/.DS_Store',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.husky/**',
      '.vscode/**',
      '.git/**',
    ],
  },
  js.configs.recommended,
  ...tsConfigs.recommended,
  // Replace reactHooks.configs.recommended with proper flat config format
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  // Add import plugin configuration with TypeScript resolver
  {
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      // Enable import resolution rules
      'import/no-unresolved': 'error',
      'import/namespace': 'warn',
      'import/named': 'error',
      'import/default': 'warn',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-duplicates': 'warn',
    },
  },
  {
    // Base configuration for all files
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      // Core ESLint rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
        },
      ],

      // Import rules - keep only the ones that don't require resolver
      'import/first': 'error',
      'import/newline-after-import': 'error',

      // Built-in sort-imports rule - sorts members within import statements
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true, // Don't handle declaration sorting (import/order will do that)
          ignoreMemberSort: false, // Do sort members within an import
          allowSeparatedGroups: true,
        },
      ],

      // import/order rule - handles sorting import declarations by groups
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // npm packages
            'internal', // paths aliased in tsconfig
            ['parent', 'sibling'], // relative imports
            'index', // index of the current directory
            'object', // object-imports
            'type', // type imports
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
    },
  },
  {
    // Specific configuration for test files
    files: [
      '**/__tests__/**/*.{js,ts,jsx,tsx}',
      '**/*.{spec,test}.{js,ts,jsx,tsx}',
      'e2e/**/*.{js,ts,jsx,tsx}',
      'src/__mocks__/**/*.{js,ts,jsx,tsx}',
    ],
    rules: {
      // Allow console statements in test files
      'no-console': 'off',
      // Allow any type in test files
      '@typescript-eslint/no-explicit-any': 'off',
      // Other test-specific relaxations
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  // Add Prettier plugin configuration
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      // These rules can conflict with Prettier
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
  eslintConfigPrettier,
];
