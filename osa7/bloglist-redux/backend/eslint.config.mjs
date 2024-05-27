import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.js'],
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-console': 0,
      'arrow-spacing': ['error', { before: true, after: true }],
    },
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
  },
  { ignores: ['dist/*'] },
]
