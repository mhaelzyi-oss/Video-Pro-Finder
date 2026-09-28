import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: 'readonly',
        DOMParser: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        MutationObserver: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
];
