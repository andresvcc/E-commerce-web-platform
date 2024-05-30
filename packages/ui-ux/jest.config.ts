export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  verbose: true,
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/config/CSSStub.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/assetsTransformer.js',
  },
  reporters: ['default', ['jest-junit', { outputDirectory: './test-results/jest' }]],
};
