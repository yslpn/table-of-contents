module.exports = {
  roots: ['<rootDir>/tests/unit/'],
  testMatch: ['<rootDir>/tests/unit/**/*.spec.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(tsx?|jsx?)$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testEnvironmentOptions: { url: 'http://localhost:3000/table-of-conents/' },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/tests/unit/__mocks__/svg.js',
    '\\.svg\\?react$': '<rootDir>/tests/unit/__mocks__/svg.js',
    '\\.css$': 'identity-obj-proxy',
    '^lodash-es$': 'lodash',
  },
};
