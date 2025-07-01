import { type Page, expect } from '@playwright/test';

import {
  BUTTON_PATTERNS,
  DRAG_OPTIONS,
  KEYBOARD,
  MOUSE_POSITIONS,
  NODE_POSITIONS,
  SELECTORS,
  TEST_STATES,
  TEST_URLS,
  WAIT_TIMES,
} from '../constants/test-constants';

// Re-export for backward compatibility
export const TEST_GEOJSON_URL = TEST_URLS.GEOJSON_PARKS;

// Helper functions for common e2e actions

/**
 * Creates a Source node by dragging from the palette to the canvas
 */
export async function createSourceNode(page: Page, position?: { x: number; y: number }) {
  const sourceNode = page.getByRole('button', { name: BUTTON_PATTERNS.ADD_SOURCE_NODE }).first();
  const canvas = page.locator(SELECTORS.REACT_FLOW_PANE);

  await sourceNode.waitFor({ state: TEST_STATES.VISIBLE });
  await expect(sourceNode).toBeEnabled();

  if (position) {
    await sourceNode.dragTo(canvas, DRAG_OPTIONS.WITH_POSITION(position));
  } else {
    await sourceNode.dragTo(canvas, DRAG_OPTIONS.FORCE);
  }

  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Creates a Layer node by dragging from the palette to the canvas
 */
export async function createLayerNode(page: Page, position?: { x: number; y: number }) {
  const layerNode = page.getByRole('button', { name: BUTTON_PATTERNS.ADD_LAYER_NODE }).first();
  const canvas = page.locator(SELECTORS.REACT_FLOW_PANE);

  await layerNode.waitFor({ state: TEST_STATES.VISIBLE });
  await expect(layerNode).toBeEnabled();

  if (position) {
    await layerNode.dragTo(canvas, DRAG_OPTIONS.WITH_POSITION(position));
  } else {
    await layerNode.dragTo(canvas, DRAG_OPTIONS.FORCE);
  }

  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Connects a Source node to a Layer node by their indices
 */
export async function connectSourceToLayer(
  page: Page,
  sourceIndex: number = 0,
  layerIndex: number = 1,
) {
  const sourceFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(sourceIndex);
  const sourceHandle = sourceFlowNode.locator(SELECTORS.REACT_FLOW_HANDLE_RIGHT);
  const layerFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(layerIndex);
  const layerHandle = layerFlowNode.locator(SELECTORS.REACT_FLOW_HANDLE_LEFT);

  await sourceHandle.dragTo(layerHandle, DRAG_OPTIONS.FORCE);
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Fills the URL input field of a Source node
 */
export async function fillSourceNodeUrl(
  page: Page,
  url: string = TEST_GEOJSON_URL,
  nodeIndex?: number,
) {
  const inputFields = page.locator(SELECTORS.GEOJSON_URL_INPUT);
  const inputField = nodeIndex !== undefined ? inputFields.nth(nodeIndex) : inputFields.first();

  await inputField.waitFor({ state: TEST_STATES.VISIBLE });
  await inputField.fill(url);
  await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
}

/**
 * Creates a connected Source-Layer pair with URL
 */
export async function createConnectedSourceLayerPair(
  page: Page,
  sourcePosition: { x: number; y: number } = NODE_POSITIONS.SOURCE_DEFAULT,
  layerPosition: { x: number; y: number } = NODE_POSITIONS.LAYER_DEFAULT,
  url: string = TEST_GEOJSON_URL,
) {
  await createSourceNode(page, sourcePosition);
  await createLayerNode(page, layerPosition);
  await connectSourceToLayer(page, 0, 1);
  await fillSourceNodeUrl(page, url);
}

/**
 * Switches to the map view
 */
export async function switchToMapView(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SHOW_MAP }).click();
  await waitForMapToLoad(page);
}

/**
 * Switches to the diagram view
 */
export async function switchToDiagramView(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SHOW_DIAGRAM }).click();
  await page.waitForSelector(SELECTORS.REACT_FLOW);
  await expect(page.locator(SELECTORS.REACT_FLOW)).toBeVisible();
}

/**
 * Waits for the Deck.gl map to load
 */
export async function waitForMapToLoad(page: Page) {
  await page.waitForSelector(SELECTORS.DECKGL_WRAPPER);
  await page.waitForSelector(SELECTORS.DECKGL_CANVAS);
  await expect(page.locator(SELECTORS.DECKGL_WRAPPER)).toBeVisible();
  await expect(page.locator(SELECTORS.DECKGL_CANVAS)).toBeVisible();
}

/**
 * Saves the flow state
 */
export async function saveFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SAVE }).click();
  await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
}

/**
 * Restores the flow state
 */
export async function restoreFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.RESTORE }).click();
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Resets the flow state
 */
export async function resetFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.RESET }).click();
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Deletes all nodes and edges using Select All + Delete
 */
export async function deleteAllElements(page: Page) {
  // Click on a node first to ensure React Flow has focus
  const firstNode = page.locator(SELECTORS.REACT_FLOW_NODE).first();
  if ((await firstNode.count()) > 0) {
    await firstNode.click();
    await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
  }

  // Select all elements
  await page.keyboard.press(KEYBOARD.SELECT_ALL);
  await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);

  // Delete selected elements
  await page.keyboard.press(KEYBOARD.DELETE);
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

/**
 * Common test setup - navigates to app and clears localStorage
 */
export async function setupTest(page: Page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.waitForSelector(SELECTORS.REACT_FLOW);
}

/**
 * Verifies that nodes and edges have expected counts
 */
export async function verifyNodeAndEdgeCounts(
  page: Page,
  expectedNodes: number,
  expectedEdges: number,
) {
  await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(expectedNodes);
  await expect(page.locator(SELECTORS.REACT_FLOW_EDGE)).toHaveCount(expectedEdges);
}

/**
 * Simulates tooltip trigger by moving mouse over map canvas
 */
export async function triggerMapTooltip(page: Page) {
  const mapCanvas = page.locator(SELECTORS.DECKGL_CANVAS);
  const box = await mapCanvas.boundingBox();

  if (box) {
    // Move to different points on the map to try to trigger tooltip
    const oneThird = MOUSE_POSITIONS.ONE_THIRD(box.width, box.height);
    await page.mouse.move(box.x + oneThird.x, box.y + oneThird.y);
    await page.waitForTimeout(WAIT_TIMES.SHORT);

    const center = MOUSE_POSITIONS.CENTER(box.width, box.height);
    await page.mouse.move(box.x + center.x, box.y + center.y);
    await page.waitForTimeout(WAIT_TIMES.SHORT);

    const twoThirds = MOUSE_POSITIONS.TWO_THIRDS(box.width, box.height);
    await page.mouse.move(box.x + twoThirds.x, box.y + twoThirds.y);
    await page.waitForTimeout(WAIT_TIMES.SHORT);
  }
}
