const rules = {
  'no-param-reassign': 'off',
  'import/prefer-default-export': 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-console': 'off',
  'no-restricted-globals': ['error', 'window', 'document'],
  'react/jsx-filename-extension': 'off',
  'react/prop-types': 'off',
  'react/jsx-props-no-spreading': 'off',
};
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:react/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
      rules,
    },
    {
      files: ['**/*.jsx', 'src/react/*.js'],
      plugins: ['react'],
      rules,
    },
  ],
};
