import { expect, test } from '@playwright/test';

import {
  EXPECTED_COUNTS,
  KEYBOARD,
  NODE_POSITIONS,
  SELECTORS,
  WAIT_TIMES,
} from './constants/test-constants';
import {
  TEST_GEOJSON_URL,
  connectSourceToLayer,
  createLayerNode,
  createSourceNode,
  fillSourceNodeUrl,
  resetFlowState,
  restoreFlowState,
  saveFlowState,
  setupTest,
  verifyNodeAndEdgeCounts,
} from './helpers/test-helpers';

test.describe('Flow Diagram', () => {
  test.beforeEach(async ({ page }) => {
    await setupTest(page);
  });

  test('should allow creating new Source node by drag and drop', async ({ page }) => {
    await createSourceNode(page);

    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.SINGLE_NODE);
    await expect(page.locator(SELECTORS.GEOJSON_URL_INPUT)).toBeVisible();
  });

  test('should allow creating new Layer node by drag and drop', async ({ page }) => {
    await createLayerNode(page, NODE_POSITIONS.LAYER_OFFSET);

    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.SINGLE_NODE);
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toContainText(/Layer/i);
  });

  test('should allow connecting Source node to Layer node', async ({ page }) => {
    await createSourceNode(page, NODE_POSITIONS.SOURCE_DEFAULT);
    await createLayerNode(page, NODE_POSITIONS.LAYER_DEFAULT);
    await connectSourceToLayer(page, 0, 1);

    await expect(page.locator(SELECTORS.REACT_FLOW_EDGE)).toHaveCount(EXPECTED_COUNTS.SINGLE_EDGE);
  });

  test('should save and restore flow state with custom nodes', async ({ page }) => {
    await createSourceNode(page, NODE_POSITIONS.SOURCE_DEFAULT);
    await createLayerNode(page, NODE_POSITIONS.LAYER_DEFAULT);

    // Save the flow
    await saveFlowState(page);

    // Reset the flow
    await resetFlowState(page);

    // Verify flow was reset (should have no nodes)
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.NO_ELEMENTS);

    // Restore the flow
    await restoreFlowState(page);

    // Verify flow was restored (should have two nodes again)
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.DOUBLE_NODES);
  });

  test('should delete nodes when pressing delete key', async ({ page }) => {
    await createSourceNode(page);

    const initialNodeCount = await page.locator(SELECTORS.REACT_FLOW_NODE).count();
    expect(initialNodeCount).toBe(EXPECTED_COUNTS.SINGLE_NODE);

    // Select a node
    await page.locator(SELECTORS.REACT_FLOW_NODE).first().click();
    await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);

    // Press delete key
    await page.keyboard.press('Delete');
    await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);

    // Verify node was deleted
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.NO_ELEMENTS);
  });

  test('should allow entering URL in Source node input field', async ({ page }) => {
    await createSourceNode(page);

    // Enter URL in the input field
    await fillSourceNodeUrl(page, TEST_GEOJSON_URL);

    // Verify the URL was entered correctly
    const inputField = page.locator(SELECTORS.GEOJSON_URL_INPUT);
    await expect(inputField).toHaveValue(TEST_GEOJSON_URL);
  });

  test('should maintain URL state when saving and restoring', async ({ page }) => {
    await createSourceNode(page);

    // Enter URL in the input field
    await fillSourceNodeUrl(page, TEST_GEOJSON_URL);

    // Save the flow
    await saveFlowState(page);

    // Reset the flow
    await resetFlowState(page);

    // Verify flow was reset
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.NO_ELEMENTS);

    // Restore the flow
    await restoreFlowState(page);

    // Verify URL was restored
    const restoredInputField = page.locator(SELECTORS.GEOJSON_URL_INPUT);
    await expect(restoredInputField).toHaveValue(TEST_GEOJSON_URL);
  });

  test('should delete nodes when selecting and pressing delete key', async ({ page }) => {
    // Create Source and Layer nodes and connect them
    await createSourceNode(page, NODE_POSITIONS.SOURCE_DEFAULT);
    await createLayerNode(page, NODE_POSITIONS.LAYER_DEFAULT);
    await connectSourceToLayer(page, 0, 1);

    // Verify edge was created
    await verifyNodeAndEdgeCounts(page, EXPECTED_COUNTS.DOUBLE_NODES, EXPECTED_COUNTS.SINGLE_EDGE);

    // Select first node and delete it
    await page.locator(SELECTORS.REACT_FLOW_NODE).first().click();
    await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
    await page.keyboard.press(KEYBOARD.DELETE);
    await page.waitForTimeout(WAIT_TIMES.SHORT);

    // Verify one node was deleted (and edge should be gone too)
    await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(EXPECTED_COUNTS.SINGLE_NODE);
    await expect(page.locator(SELECTORS.REACT_FLOW_EDGE)).toHaveCount(EXPECTED_COUNTS.NO_ELEMENTS);
  });
});
