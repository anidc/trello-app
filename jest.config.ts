import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",

  testMatch: ["<rootDir>/src/**/__tests__/**/*.{spec,test}.{ts,tsx}"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/test/__mocks__/fileMock.ts",
  },

  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],

  extensionsToTreatAsEsm: [".ts", ".tsx"],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/__tests__/**",
  ],
};

export default config;
