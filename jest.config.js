/* eslint-disable max-len */
module.exports = {
  setupFiles: ['<rootDir>/test/setup/enzymeSetup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
  ],
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.(jpg|jpeg|png|gif|svg)': '<rootDir>/__mocks__/ImageStub.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/ImageStub.js',
  },
};
