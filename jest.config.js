module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  setupFiles: ["./jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.(spec|test).ts"],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
