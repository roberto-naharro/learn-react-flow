import { test, expect } from '@playwright/test';

test.describe('Playwright environment setup', () => {
  test('should load the application', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Verify page title contains expected text
    await expect(page).toHaveTitle(/Vite \+ React/);
  });

  test('should have correct environment', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Check if we can interact with the DOM
    const button = page.getByRole('button', { name: /count is/i });
    await expect(button).toBeVisible();

    // Check if React is working by interacting with the counter
    await button.click();
    await expect(button).toContainText('count is 1');
  });
});
