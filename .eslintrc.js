module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-conditionals', '@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'prettier'],
  extends: [
    'airbnb', // airbnb 코드 스타일 사용시
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  globals: {
    // 전역 객체에 접근하는 경우 ts 는 오류를 내기 때문에 사용하는 전역 객체를 whitelist 해주세요
    i18next: true,
  },
  rules: {
    'import/order': 'error', // import 순서로 발생할 수 있는 오류 꼭 사용해주세요!
    'arrow-body-style': ['error', 'as-needed'],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off', //
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off', // 꼭 사용해주세요
    'react/prop-types': 'off',
    'object-curly-newline': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'no-console': 'off', // 옵셔널
    'no-prototype-builtins': 'off',
    'no-param-reassign': 'off', // 옵셔널
    'new-cap': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-throw-literal': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/no-unescaped-entities': 0,
    'react/no-danger': 0,
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // 명시적 any 타입 선언을 오류로 할건지 인데 저희는 off 해두고 타입 정리 싹 한 뒤에 error 로 잡을 예정 입니다. 취향에 따라 설정 해주세요
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'import/no-mutable-exports': 'off',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/iframe-has-title': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/no-onchange': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'global-require': 'off',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
};
