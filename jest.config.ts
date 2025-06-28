import { createDefaultPreset } from 'ts-jest';

import type { Config } from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

// Update the ts-jest configuration to use our custom tsconfig
for (const key in tsJestTransformCfg) {
  const typedKey = key as keyof typeof tsJestTransformCfg;
  if (
    Array.isArray(tsJestTransformCfg[typedKey]) &&
    tsJestTransformCfg[typedKey][0] === 'ts-jest'
  ) {
    tsJestTransformCfg[typedKey][1] = {
      ...tsJestTransformCfg[typedKey][1],
      tsconfig: 'tsconfig.jest.json',
    };
  }
}

const config: Config = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  // Explicitly exclude e2e tests and generated files from Jest
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/coverage/',
    '/dist/',
    '/playwright-report/',
    '/test-results/',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  // Set cache directory to improve performance
  cacheDirectory: '<rootDir>/.jest-cache',
  // Mock static assets like SVG files
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|webp|ico)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
};

export default config;
