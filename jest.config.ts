import type { Config } from 'jest';

const config: Config = {
  // Use jsdom for DOM testing since we're testing React components
  testEnvironment: 'jsdom',

  // Use ts-jest for TypeScript files
  preset: 'ts-jest',

  // Use our custom tsconfig
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],

  // Explicitly exclude e2e tests and generated files from Jest
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/coverage/',
    '/dist/',
    '/playwright-report/',
    '/test-results/',
  ],

  // Transform ES modules from deck.gl and related packages
  transformIgnorePatterns: ['node_modules/(?!(@deck\\.gl|@mapbox|@turf)/)'],

  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

  // Set cache directory to improve performance
  cacheDirectory: '<rootDir>/.jest-cache',

  // Mock static assets like SVG files and handle path aliases
  moduleNameMapper: {
    // Path aliases
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@domain-flow/(.*)$': '<rootDir>/src/domain/flow/$1',
    '^@domain-layer-manager/(.*)$': '<rootDir>/src/domain/layer-manager/$1',
    '^@domain-map-viewer/(.*)$': '<rootDir>/src/domain/map-viewer/$1',
    '^@router/(.*)$': '<rootDir>/src/router/$1',
    // Static asset mocks
    '\\.svg$': '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.css$': '<rootDir>/src/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|webp|ico)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },

  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupAfterEnv.ts'],
};

export default config;
