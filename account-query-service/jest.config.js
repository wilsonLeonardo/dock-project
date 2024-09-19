const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json', babel: true }],
  },
  testMatch: ['**/tests/**/*.test.(ts|js|tsx)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
  testSequencer: './tests/e2e/testSequencer.js',
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    './node_modules/',
    './docs/',
    './tests/',
    './dist/',
    './infra/',
    'src/index.ts',
    './development',
    'src/config/types',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
