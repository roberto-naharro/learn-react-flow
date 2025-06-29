import { expect, test } from '@playwright/test';

test.describe('Flow Diagram', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('/');

    // Clear localStorage first
    await page.evaluate(() => localStorage.clear());

    // Wait for the flow diagram to be visible
    await page.waitForSelector('.react-flow');
  });

  test('should allow creating new nodes by drag and drop', async ({ page }) => {
    // Find a draggable node in the palette
    const sourceNode = page.locator('.dndnode:has-text("Input Node")').first();

    // Get the react-flow pane where we'll drop the node
    const canvas = page.locator('.react-flow__pane');

    // Perform drag and drop - add force:true to ensure the drag works
    await sourceNode.dragTo(canvas, { force: true });

    // Wait for the new node to appear
    await page.waitForTimeout(500);

    // Check that a new node was added
    await expect(page.locator('.react-flow__node')).toHaveCount(1);
  });

  test('should allow connecting nodes', async ({ page }) => {
    // First, make sure we have at least two nodes to connect
    const sourceNode = page.locator('.dndnode:has-text("Input Node")').first();
    const canvas = page.locator('.react-flow__pane');

    // Create first node (input)
    await sourceNode.dragTo(canvas, { force: true });
    await page.waitForTimeout(300);

    // Create second node (default)
    const defaultNode = page.locator('.dndnode:has-text("Default Node")').first();
    await defaultNode.dragTo(canvas, {
      force: true,
      targetPosition: { x: 100, y: 200 },
    });
    await page.waitForTimeout(300);

    // Get the first and second nodes
    const firstNode = page.locator('.react-flow__node').first();
    const secondNode = page.locator('.react-flow__node').nth(1);

    // Get the source handle of the first node - using the exact class from the DOM
    const sourceHandle = firstNode.locator('.react-flow__handle-bottom');

    // Get the target handle of the second node - using the exact class from the DOM
    const targetHandle = secondNode.locator('.react-flow__handle-top');

    // Connect the nodes by dragging from source to target handle
    await sourceHandle.dragTo(targetHandle, { force: true });

    // Wait for the edge to be created
    await page.waitForTimeout(500);

    // Check that a new edge was created
    await expect(page.locator('.react-flow__edge')).toHaveCount(1);
  });

  test('should save and restore flow state', async ({ page }) => {
    // Create a simple flow with a couple of nodes
    const canvas = page.locator('.react-flow__pane');

    // Create a node
    const sourceNode = page.locator('.dndnode:has-text("Input Node")').first();
    await sourceNode.dragTo(canvas, { force: true });
    await page.waitForTimeout(300);

    // Create another node (default)
    const defaultNode = page.locator('.dndnode:has-text("Default Node")').first();
    await defaultNode.dragTo(canvas, {
      force: true,
      targetPosition: { x: 100, y: 200 },
    });
    await page.waitForTimeout(300);

    // Save the flow
    await page.getByRole('button', { name: /save/i }).click();

    // Reset the flow
    await page.getByRole('button', { name: /reset/i }).click();
    await page.waitForTimeout(500);

    // Verify flow was reset (should have no nodes)
    await expect(page.locator('.react-flow__node')).toHaveCount(0);

    // Restore the flow
    await page.getByRole('button', { name: /restore/i }).click();
    await page.waitForTimeout(500);

    // Verify flow was restored (should have at least one node again)
    await expect(page.locator('.react-flow__node')).toHaveCount(2);
  });

  test('should delete nodes when pressing delete key', async ({ page }) => {
    // Create a node
    const sourceNode = page.locator('.dndnode:has-text("Input Node")').first();
    const canvas = page.locator('.react-flow__pane');
    await sourceNode.dragTo(canvas, { force: true });
    await page.waitForTimeout(300);

    // Get the initial node count
    const initialNodeCount = await page.locator('.react-flow__node').count();
    expect(initialNodeCount).toBe(1);

    // Select a node
    await page.locator('.react-flow__node').first().click();
    await page.waitForTimeout(200);

    // Press delete key
    await page.keyboard.press('Delete');
    await page.waitForTimeout(200);

    // Verify node was deleted
    await expect(page.locator('.react-flow__node')).toHaveCount(0);
  });
});
