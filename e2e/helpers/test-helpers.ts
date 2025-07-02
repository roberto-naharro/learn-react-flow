import { type Page, expect } from '@playwright/test';

import {
  BUTTON_PATTERNS,
  DRAG_OPTIONS,
  KEYBOARD,
  MAP_STATUS_PATTERNS,
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

export async function createIntersectionNode(page: Page, position?: { x: number; y: number }) {
  const intersectionNode = page
    .getByRole('button', { name: BUTTON_PATTERNS.ADD_INTERSECTION_NODE })
    .first();
  const canvas = page.locator(SELECTORS.REACT_FLOW_PANE);

  await intersectionNode.waitFor({ state: TEST_STATES.VISIBLE });
  await expect(intersectionNode).toBeEnabled();

  if (position) {
    await intersectionNode.dragTo(canvas, DRAG_OPTIONS.WITH_POSITION(position));
  } else {
    await intersectionNode.dragTo(canvas, DRAG_OPTIONS.FORCE);
  }

  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

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

export async function connectSourceToIntersection(
  page: Page,
  sourceIndex: number,
  intersectionIndex: number,
  targetHandleIndex: number = 0, // 0 for first input, 1 for second input
) {
  const sourceFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(sourceIndex);
  const sourceHandle = sourceFlowNode.locator(SELECTORS.REACT_FLOW_HANDLE_RIGHT);
  const intersectionFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(intersectionIndex);

  const intersectionNodeId = await intersectionFlowNode.getAttribute('data-id');
  const handleId =
    targetHandleIndex === 0 ? `${intersectionNodeId}-target-a` : `${intersectionNodeId}-target-b`;
  const intersectionHandle = intersectionFlowNode.locator(
    SELECTORS.REACT_FLOW_HANDLE_BY_ID(handleId),
  );

  await sourceHandle.dragTo(intersectionHandle, DRAG_OPTIONS.FORCE);
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

export async function connectIntersectionToLayer(
  page: Page,
  intersectionIndex: number,
  layerIndex: number,
) {
  const intersectionFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(intersectionIndex);

  const intersectionNodeId = await intersectionFlowNode.getAttribute('data-id');
  const intersectionHandle = intersectionFlowNode.locator(
    SELECTORS.REACT_FLOW_HANDLE_BY_ID(`${intersectionNodeId}-source`),
  );
  const layerFlowNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(layerIndex);
  const layerHandle = layerFlowNode.locator(SELECTORS.REACT_FLOW_HANDLE_LEFT);

  await intersectionHandle.dragTo(layerHandle, DRAG_OPTIONS.FORCE);
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

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

export async function createIntersectionWorkflow(
  page: Page,
  sourceAUrl: string = TEST_URLS.GEOJSON_PARKS,
  sourceBUrl: string = TEST_URLS.GEOJSON_STATES,
) {
  await createSourceNode(page, NODE_POSITIONS.SOURCE_DEFAULT);
  await zoomOut(page);
  await createSourceNode(page, NODE_POSITIONS.SOURCE_SECONDARY);
  await createIntersectionNode(page, NODE_POSITIONS.INTERSECTION_DEFAULT);
  await createLayerNode(page, NODE_POSITIONS.LAYER_SECOND);

  await connectSourceToIntersection(page, 0, 2, 0);

  await connectSourceToIntersection(page, 1, 2, 1);

  await connectIntersectionToLayer(page, 2, 3);

  await fillSourceNodeUrl(page, sourceAUrl, 0);
  await fillSourceNodeUrl(page, sourceBUrl, 1);
}

export async function verifyIntersectionStatus(
  page: Page,
  intersectionNodeIndex: number = 2,
  expectedStatus: 'loading' | 'ready' | 'error' = 'ready',
) {
  const intersectionNode = page.locator(SELECTORS.REACT_FLOW_NODE).nth(intersectionNodeIndex);

  switch (expectedStatus) {
    case 'loading':
      await expect(intersectionNode.getByText('🟡 Computing...')).toBeVisible();
      break;
    case 'ready':
      await expect(intersectionNode.getByText('🟢 Ready')).toBeVisible();
      break;
    case 'error':
      await expect(intersectionNode.getByText('🔴 Error')).toBeVisible();
      break;
  }
}

export async function switchToMapView(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SHOW_MAP }).click();
  await waitForMapToLoad(page);
}

export async function switchToDiagramView(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SHOW_DIAGRAM }).click();
  await page.waitForSelector(SELECTORS.REACT_FLOW);
  await expect(page.locator(SELECTORS.REACT_FLOW)).toBeVisible();
}

export async function waitForMapToLoad(page: Page) {
  await page.waitForSelector(SELECTORS.DECKGL_WRAPPER);
  await page.waitForSelector(SELECTORS.DECKGL_CANVAS);
  await expect(page.locator(SELECTORS.DECKGL_WRAPPER)).toBeVisible();
  await expect(page.locator(SELECTORS.DECKGL_CANVAS)).toBeVisible();
}

export async function saveFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.SAVE }).click();
  await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
}

export async function restoreFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.RESTORE }).click();
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

export async function resetFlowState(page: Page) {
  await page.getByRole('button', { name: BUTTON_PATTERNS.RESET }).click();
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

export async function deleteAllElements(page: Page) {
  const firstNode = page.locator(SELECTORS.REACT_FLOW_NODE).first();
  if ((await firstNode.count()) > 0) {
    await firstNode.click();
    await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);
  }

  await page.keyboard.press(KEYBOARD.SELECT_ALL);
  await page.waitForTimeout(WAIT_TIMES.VERY_SHORT);

  await page.keyboard.press(KEYBOARD.DELETE);
  await page.waitForTimeout(WAIT_TIMES.SHORT);
}

export async function setupTest(page: Page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.waitForSelector(SELECTORS.REACT_FLOW);
}

/**
 * Waits for specific number of nodes to be ready in processing status
 * @param page - Playwright page instance
 * @param expectedReadyCount - Number of nodes expected to be ready
 * @param timeout - Maximum wait time in milliseconds
 */
export async function waitForNodesReady(
  page: Page,
  expectedReadyCount: number = 3,
  timeout: number = WAIT_TIMES.INTERSECTION,
) {
  const statusElement = page.getByTestId(SELECTORS.MAP_PROCESSING_STATUS_ID);

  await expect(statusElement).toHaveText(
    new RegExp(`${MAP_STATUS_PATTERNS.READY} ${expectedReadyCount}`),
    { timeout },
  );
}

export async function zoomOut(page: Page, times: number = 5) {
  const canvas = page.locator(SELECTORS.REACT_FLOW_PANE);
  const box = await canvas.boundingBox();
  if (box) {
    const centerX = box.x + box.width / 3;
    const centerY = box.y + box.height / 2;
    await page.mouse.click(centerX, centerY);
  }

  await page.mouse.wheel(0, times * 100);

  await page.keyboard.press(KEYBOARD.ESCAPE);
}

export async function verifyNodeAndEdgeCounts(
  page: Page,
  expectedNodes: number,
  expectedEdges: number,
) {
  await expect(page.locator(SELECTORS.REACT_FLOW_NODE)).toHaveCount(expectedNodes);
  await expect(page.locator(SELECTORS.REACT_FLOW_EDGE)).toHaveCount(expectedEdges);
}

export async function triggerMapTooltip(page: Page) {
  const mapCanvas = page.locator(SELECTORS.DECKGL_CANVAS);
  const box = await mapCanvas.boundingBox();

  if (box) {
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
