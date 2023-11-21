module.exports = {
  extends: 'airbnb',
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  env: {
    browser: true,
    node: true,
    jest: true, // Enable the Jest environment
  },
};
