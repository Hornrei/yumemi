// jest.config.js

module.exports = {
  preset: "ts-jest",
  moduleDirectories: ['node_modules'],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    testEnvironment: "node",
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
      "^axios$": "axios/dist/node/axios.cjs"
    },
    transform: {
      '^.+\\.[t|j]sx?$': 'babel-jest',
    }
  };
