module.exports = {
  moduleFileExtensions: ['js'],
  testMatch: ['**/**/__tests__/**/*.test.js?(x)'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['/node_modules/', '.history'],
  transform: {
    '^.+\\.js$': 'babel-7-jest'
  }
}
