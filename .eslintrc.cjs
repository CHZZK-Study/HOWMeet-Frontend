module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint', 'prettier'],
  rules: {
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration', // 컴포넌트 선언 시 function 선언문 사용
        unnamedComponents: 'arrow-function',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': ['off'],
    '@typescript-eslint/naming-convention': [
      // 네이밍 컨벤션
      'warn',
      {
        selector: 'typeAlias', // 타입 선언
        format: ['PascalCase'],
      },
      {
        selector: 'interface', // 인터페이스 선언
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'function', // exported function (컴포넌트 명)
        format: ['PascalCase'],
        modifiers: ['exported'],
      },
      {
        selector: 'function', // function
        format: ['camelCase'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {}, // 추가된 부분
    },
  },
};
