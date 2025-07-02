import { describe, expect, it, jest } from '@jest/globals';

jest.mock('@deck.gl/layers', () => ({
  GeoJsonLayer: function MockGeoJsonLayer() {
    return null;
  },
}));

jest.mock('@deck.gl/react', () => ({
  __esModule: true,
  default: function MockDeckGL() {
    return null;
  },
}));

jest.mock('react-map-gl/maplibre', () => ({
  Map: function MockMap() {
    return null;
  },
}));

jest.mock('../domain/map-viewer/workers/mapWorkerManager', () => ({
  createMapWorkerManager: () => ({
    fetchGeoJson: jest.fn(),
    onGeoJsonMessage: jest.fn(),
    offGeoJsonMessage: jest.fn(),
    computeIntersection: jest.fn(),
    onIntersectionMessage: jest.fn(),
    offIntersectionMessage: jest.fn(),
    isGeoJsonAvailable: true,
    isIntersectionAvailable: true,
    terminate: jest.fn(),
  }),
  getMapWorkerManager: () => ({
    fetchGeoJson: jest.fn(),
    onGeoJsonMessage: jest.fn(),
    offGeoJsonMessage: jest.fn(),
    computeIntersection: jest.fn(),
    onIntersectionMessage: jest.fn(),
    offIntersectionMessage: jest.fn(),
    isGeoJsonAvailable: true,
    isIntersectionAvailable: true,
    terminate: jest.fn(),
  }),
}));

/**
 * @jest-environment node
 */

describe('Test Jest environment', () => {
  it('should have the correct environment variables', () => {
    expect(process.env.NODE_ENV).toBeDefined();
    expect(jest).toBeDefined();
  });

  it('should be able to import TypeScript files', async () => {
    const { default: App } = await import('../App');
    expect(App).toBeDefined();
  });

  it('should have the correct Jest configuration', () => {
    expect(true).toBe(true);
  });
});
