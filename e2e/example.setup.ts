// This file demonstrates how to use Playwright global setup

import { FullConfig } from '@playwright/test';

/**
 * Global setup function that runs before all tests
 */
async function globalSetup(config: FullConfig) {
  // This is where you would put setup code that executes once before all tests
  console.log('Starting Playwright tests with config:', config.projects.length, 'projects');

  // Example: you could set up test data, environment variables, etc.
  process.env.TEST_TIMESTAMP = new Date().toISOString();
}

export default globalSetup;
