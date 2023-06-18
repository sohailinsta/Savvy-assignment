module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
      '^axios$': '<rootDir>/node_modules/axios',
      '\\.(css|less)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)',
    ],
    testEnvironment: 'jsdom',
    // moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  };
  