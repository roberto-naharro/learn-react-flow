import { jest } from '@jest/globals';

import type { MapWorkerManager } from '@domain-map-viewer/workers/mapWorkerManager';

// Exportable mock functions for testing assertions
export const mockFetchGeoJson = jest.fn();
export const mockOnGeoJsonMessage = jest.fn();
export const mockOffGeoJsonMessage = jest.fn();
export const mockComputeIntersection = jest.fn();
export const mockOnIntersectionMessage = jest.fn();
export const mockOffIntersectionMessage = jest.fn();
export const mockTerminate = jest.fn();

/**
 * Builds a mock MapWorkerManager for testing purposes
 * @param overrides - Optional overrides for specific methods
 * @returns Mock MapWorkerManager instance
 */
export function buildMapWorkerManagerMock(overrides?: Partial<MapWorkerManager>): MapWorkerManager {
  return {
    fetchGeoJson: mockFetchGeoJson,
    onGeoJsonMessage: mockOnGeoJsonMessage,
    offGeoJsonMessage: mockOffGeoJsonMessage,
    computeIntersection: mockComputeIntersection,
    onIntersectionMessage: mockOnIntersectionMessage,
    offIntersectionMessage: mockOffIntersectionMessage,
    isGeoJsonAvailable: true,
    isIntersectionAvailable: true,
    terminate: mockTerminate,
    ...overrides,
  };
}

/**
 * Default mock for getMapWorkerManager function
 */
export const mockGetMapWorkerManager = jest.fn(() => buildMapWorkerManagerMock());

/**
 * Default mock for createMapWorkerManager function
 */
export const mockCreateMapWorkerManager = jest.fn(() => buildMapWorkerManagerMock());
