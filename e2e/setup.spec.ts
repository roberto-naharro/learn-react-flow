import { expect, test } from '@playwright/test';

test.describe('Playwright environment setup', () => {
  test('should load the application', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Simply verify the page title to check if the environment is working
    await expect(page).toHaveTitle(/Vite \+ React/);
  });

  test('should render the page content', async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Basic check to ensure the page content is rendered
    await expect(page.locator('body')).toBeVisible();
  });
});
