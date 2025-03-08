import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    ignores: ['lib/**', 'node_modules/**'],
  },

  {
    name: 'Allow NodeJS globals',
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    name: 'Recommended ESLint configuration',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    rules: js.configs.recommended.rules,
  },

  {
    name: 'Jest configuration',
    files: ['**/__tests__/**'],
    plugins: { jest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
  },

  {
    name: 'Prettier configuration',
    ...prettier,
  },

  {
    name: 'Local overrides',
    rules: {
      'no-unused-vars': [
        2,
        {
          args: 'all',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
