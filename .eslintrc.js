module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.common.js',
      },
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['react'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'new-cap': 0, // disable for HigherOrderComponent wrapping
    'no-console': 0, // allow console.log etc
    'no-param-reassign': [2, { props: false }],
    'no-underscore-dangle': 0, // allow _func
    'global-require': 0,
    'jsx-a11y/no-static-element-interactions': 0, // allow div onClick etc
    'import/no-extraneous-dependencies': 0, // allow usage of devDependencies
    'react/forbid-prop-types': 0, // allow PropTypes.object
    'react/jsx-filename-extension': 0, // enfore all .js extension
    'react/jsx-wrap-multilines': 0,
    'no-unused-vars': [2, { ignoreRestSiblings: true }],
    'arrow-parens': [2, 'as-needed'],
    'react/no-unused-prop-types': [2, { skipShapeProps: true }], // skip shape
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
};
