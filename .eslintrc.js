module.exports = {
    plugins: ['@typescript-eslint'],
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 7,
      parser: '@typescript-eslint/parser',
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        experimentalDecorators: true
      },
      sourceType: "module"
    },
    extends: [
      '@nuxtjs'
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      'import/order': 'off'
    }
  }
