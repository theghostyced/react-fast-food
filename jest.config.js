/* eslint-disable max-len */
module.exports = {
  setupFiles: ['<rootDir>/test/setup/enzymeSetup.js'],
  transform: {
    '^.+\\.js|jsx$': 'babel-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/root.jsx',
    '!src/containers/index.js',
    '!src/components/shared/index.js',
    '!src/components/shared/Navbar/*.jsx',
    '!src/components/shared/SideNav/*.jsx',
    '!src/components/shared/Card/*.jsx',
    '!src/components/shared/OrderCard/*.jsx',
    '!src/containers/Order/*.jsx',
    '!src/containers/History/*.jsx',
    '!src/containers/CartContainer/*.jsx',
    '!src/containers/Admin/*.jsx',
    '!src/containers/Admin/actions/*.js',
    '!src/routes/*.js',
    '!src/helpers/dateFormatter.js',
    '!src/reducers/index.js',
    '!src/reducers/admin.js',
    '!src/reducers/cart.js',
    '!src/store/*.js',
  ],
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.(jpg|jpeg|png|gif|svg)': '<rootDir>/__mocks__/ImageStub.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/ImageStub.js',
  },
};
