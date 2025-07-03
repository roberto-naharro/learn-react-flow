import importAliasPlugin from '@dword-design/eslint-plugin-import-alias';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import * as reactHooksPlugin from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      // Comprehensive ignore patterns for performance
      '**/.*/**',
      '**/.DS_Store',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.husky/**',
      '.vscode/**',
      '.git/**',
      '**/*.d.ts',
      'scripts/**',
      'public/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // TypeScript-specific configuration following Medium article recommendations
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.lint.json'], // Use dedicated lint config
        tsconfigRootDir: import.meta.dirname,
        createDefaultProgram: false, // CRITICAL: Must be false for performance
      },
    },
    plugins: {
      'react-hooks': reactHooksPlugin,
      ...importAliasPlugin.configs.recommended.plugins,
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
          project: './tsconfig.app.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/cache': {
        lifetime: Infinity,
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
    rules: {
      // Core ESLint rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // TypeScript rules - minimal set for performance
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
        },
      ],

      // Import rules - lightweight versions for performance
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'warn',

      // Enforce path aliases over relative imports
      '@dword-design/import-alias/prefer-alias': [
        'error',
        {
          alias: {
            '@shared': './src/shared',
            '@domain-flow': './src/domain/flow',
            '@domain-layer-manager': './src/domain/layer-manager',
            '@domain-map-viewer': './src/domain/map-viewer',
            '@router': './src/router',
          },
        },
      ],

      // Built-in sort-imports rule
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],

      // Simplified import/order for performance
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'type'],
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
            {
              pattern: '@shared/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@domain-flow/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@domain-layer-manager/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@domain-map-viewer/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@router/**',
              group: 'internal',
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
      '**/__mocks__/**/*.{js,ts,jsx,tsx}',
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
