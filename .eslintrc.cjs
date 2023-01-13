module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "overrides": [],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-namespace": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-non-null-assertion": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
};
