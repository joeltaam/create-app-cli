module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier/@typescript-eslint', 'plugin:react/recommended', 'google', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
  },
  settings: {
    react: {
      pargma: 'React',
      version: 'detect',
    },
  },
}
