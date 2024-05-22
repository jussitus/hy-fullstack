module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    eqeqeq: "error",
    "no-trailing-spaces": "warn",
    "object-curly-spacing": ["warn", "always"],
    "arrow-spacing": ["warn", { before: true, after: true }],
    "no-console": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "no-unused-vars": 2,
  },
};
