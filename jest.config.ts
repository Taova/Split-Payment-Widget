import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testMatch: [
    "<rootDir>/tests/units/**/*.test.[jt]s?(x)",
    "<rootDir>/tests/integration/**/*.test.[jt]s?(x)",
  ],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
};

export default config;
