module.exports = {
  extends: 'airbnb',
  rules: {
    'import/extensions': 'off',
  },
  env: {
    browser: true,
    node: true,
    jest: true, // Enable the Jest environment
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {}
};
