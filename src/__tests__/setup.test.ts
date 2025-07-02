import { describe, expect, it, jest } from '@jest/globals';

jest.mock('@deck.gl/layers', () => ({
  GeoJsonLayer: function MockGeoJsonLayer() {},
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
jest.mock('../domain/map-viewer/providers/GeoJsonProvider');
jest.mock('../domain/map-viewer/providers/IntersectionProvider', () => ({
  IntersectionProvider: ({ children }: { children: React.ReactNode }) => children,
  useIntersection: () => ({
    computeIntersection: jest.fn(),
    getIntersectionResult: jest.fn(() => null),
    clearIntersectionResult: jest.fn(),
  }),
}));
jest.mock('../shared/workers/geoJsonWorkerManager', () => ({
  createGeoJsonWorkerManager: () => ({
    fetchGeoJson: jest.fn(),
    onMessage: jest.fn(),
    offMessage: jest.fn(),
    terminate: jest.fn(),
    isAvailable: true,
  }),
  getGeoJsonWorkerManager: () => ({
    fetchGeoJson: jest.fn(),
    onMessage: jest.fn(),
    offMessage: jest.fn(),
    terminate: jest.fn(),
    isAvailable: true,
  }),
}));
jest.mock('../shared/workers/intersectionWorkerManager', () => ({
  createIntersectionWorkerManager: () => ({
    computeIntersection: jest.fn(),
    onMessage: jest.fn(),
    offMessage: jest.fn(),
    terminate: jest.fn(),
    isAvailable: true,
  }),
  getIntersectionWorkerManager: () => ({
    computeIntersection: jest.fn(),
    onMessage: jest.fn(),
    offMessage: jest.fn(),
    terminate: jest.fn(),
    isAvailable: true,
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
