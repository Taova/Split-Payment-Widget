import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testMatch: ["<rootDir>/src/**/*.test.[jt]s?(x)"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.app.json",
    },
  },
};

export default config;
