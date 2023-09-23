module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 12,
  },
  rules: {
    'no-unused-vars': [2, { args: 'after-used', argsIgnorePattern: '^_' }],
    'prettier/prettier': 'error',
  },
};
