module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  settings: {
    'import/ignore': ['node_modules'],
    'import/extensions': ['.js'],
    'import/resolver': {
      webpack: {
        config: './config/webpack.dev.js'
      },
      node: {
        extensions: ['.js', '.json']
      }
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ['react'],
  extends: ['airbnb'],
  rules: {
    // additional rules to work with eslint-config-airbnb
    'comma-dangle': [2, 'never'], // yuk, disallow comma after the last propery of an object
    'new-cap': 0, // disable for HigherOrderComponent wrapping
    'no-console': 0, // still good for debuging
    'no-underscore-dangle': 0, // _whatever is allowed
    'no-param-reassign': 0, // e.target.value = ''; happens all the time
    'no-plusplus': 0, // i++ is allowed
    'no-restricted-syntax': [
      2,
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'no-confusing-arrow': 0,
    'no-unused-vars': [2, { ignoreRestSiblings: true }],
    'arrow-parens': [2, 'as-needed'],
    'jsx-a11y/no-static-element-interactions': 0, // div onClick should be allowed
    'import/no-extraneous-dependencies': 0, // not necessary at all
    'react/jsx-filename-extension': 0, // enfore all .js extension
    'react/jsx-indent': 0,
    'react/no-unused-prop-types': [2, { skipShapeProps: true }], // skip shape
    'react/forbid-prop-types': 0 // PropTypes.object is allowed
  }
};
