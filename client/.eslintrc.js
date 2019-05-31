module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["react-app", "airbnb", "plugin:jsx-a11y/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "rules": {
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "react/jsx-filename-extension": 0,
    "import/prefer-default-export": 0,
    "no-param-reassign": [2, { "props": false }]
  }
};
