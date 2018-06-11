module.exports = {
  moduleFileExtensions: ['jsx', 'js'],
  testMatch: ['**/**/__tests__/**/*.test.js?(x)'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['/node_modules/'],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  coverageDirectory: '<rootDir>/__tests__/coverage'
}
