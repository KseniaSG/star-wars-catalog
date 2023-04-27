module.exports = {
  preset: 'jest-preset-angular',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/testing/setup-jest.ts', 'jest-extended/all'],
  "modulePaths": [
    "<rootDir>"
  ],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@angular|@datorama/akita|lodash-es|${esModules}|.*\\.mjs$)'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    'package.json': '<rootDir>/package.json'
  },
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/**/setupJest.ts",
    "!src/**/jestGlobalMocks.ts",
    "!src/**/*.module.ts",
    "!e2e/**/*",
    "!<rootDir>/node_modules/**/*",
    "!<rootDir>/dist/**/*",
    "!<rootDir>/**/*.json",
    "!<rootDir>/*.json"
  ],
}
