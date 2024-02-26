module.exports = {
  roots: ['<rootDir>/test'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1'
  },
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    '!<rootDir>/node_modules/*',
    '!<rootDir>/test/**/*',
    '!<rootDir>/consts/*',
    '!<rootDir>/configs/*',
    '!<rootDir>/docs/*',
    '!<rootDir>/emails/*',
    '!<rootDir>/*.json',
    '!<rootDir>/*.yaml'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  coverageReporters: ['html', 'lcov'],
  coverageDirectory: '<rootDir>/test/coverage',
  testTimeout: 12000,
  testMatch: ['<rootDir>/test/integration/**/*.spec.js', '<rootDir>/test/unit/**/*.spec.js'],
  testResultsProcessor: 'jest-sonar-reporter'
}
