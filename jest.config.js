/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/*.test.js*', '**/*.test.ts*'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  setupFilesAfterEnv: ['<rootDir>/support/setupTests.js'],
};

module.exports = config;
