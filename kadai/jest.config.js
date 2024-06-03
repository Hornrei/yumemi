// jest.config.js

module.exports = {
  moduleDirectories: ['node_modules'],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
      "^axios$": "axios/dist/node/axios.cjs"
    },
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    },
  };
