import { describe, expect, it, jest } from '@jest/globals';

/**
 * @jest-environment node
 */

describe('Test Jest environment', () => {
  it('should have the correct environment variables', () => {
    // Check that Node environment is set correctly
    expect(process.env.NODE_ENV).toBeDefined();

    // Check that Jest is working
    expect(jest).toBeDefined();
  });

  it('should be able to import TypeScript files', async () => {
    // Import a TypeScript file from the src directory using dynamic import
    // This handles ESM imports properly
    const { default: App } = await import('../App');
    expect(App).toBeDefined();
  });

  it('should have the correct Jest configuration', () => {
    // This test will pass if the test runner is working correctly
    expect(true).toBe(true);
  });
});
