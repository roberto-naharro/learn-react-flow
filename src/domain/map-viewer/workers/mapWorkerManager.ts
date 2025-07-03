// Import workers using Vite's ?worker syntax
import type { WorkerManager } from '@shared/workers/types';
import { createWorkerManager } from '@shared/workers/workerManager';

import GeoJsonWorker from './geoJsonWorker.ts?worker';
import IntersectionWorker from './intersectionWorker.ts?worker';

import type {
  ComputeIntersectionMessage,
  FetchGeoJsonMessage,
  GeoJsonWorkerResponse,
  IntersectionWorkerResponse,
} from './types';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * Unified map operations worker manager
 * Handles both GeoJSON fetching and intersection computation
 */
export interface MapWorkerManager {
  // GeoJSON operations
  fetchGeoJson: (url: string) => void;
  onGeoJsonMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void) => void;
  offGeoJsonMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void) => void;

  // Intersection operations
  computeIntersection: (
    nodeId: string,
    geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
    geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void;
  onIntersectionMessage: (
    listener: (event: MessageEvent<IntersectionWorkerResponse>) => void,
  ) => void;
  offIntersectionMessage: (
    listener: (event: MessageEvent<IntersectionWorkerResponse>) => void,
  ) => void;

  // Common operations
  isGeoJsonAvailable: boolean;
  isIntersectionAvailable: boolean;
  terminate: () => void;
}

/**
 * Creates a unified worker manager for all map operations
 */
export function createMapWorkerManager(): MapWorkerManager {
  const geoJsonWorkerFactory = () => new GeoJsonWorker();
  const intersectionWorkerFactory = () => new IntersectionWorker();

  const geoJsonWorker: WorkerManager<FetchGeoJsonMessage, GeoJsonWorkerResponse> =
    createWorkerManager(geoJsonWorkerFactory);

  const intersectionWorker: WorkerManager<ComputeIntersectionMessage, IntersectionWorkerResponse> =
    createWorkerManager(intersectionWorkerFactory);

  return {
    // GeoJSON operations
    fetchGeoJson: (url: string): void => {
      const message: FetchGeoJsonMessage = {
        type: 'FETCH_GEOJSON',
        url,
      };
      geoJsonWorker.postMessage(message);
    },

    onGeoJsonMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void): void => {
      geoJsonWorker.addEventListener('message', listener);
    },

    offGeoJsonMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void): void => {
      geoJsonWorker.removeEventListener('message', listener);
    },

    // Intersection operations
    computeIntersection: (
      nodeId: string,
      geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
      geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
    ): void => {
      const message: ComputeIntersectionMessage = {
        type: 'COMPUTE_INTERSECTION',
        geojsonA,
        geojsonB,
        nodeId,
      };
      intersectionWorker.postMessage(message);
    },

    onIntersectionMessage: (
      listener: (event: MessageEvent<IntersectionWorkerResponse>) => void,
    ): void => {
      intersectionWorker.addEventListener('message', listener);
    },

    offIntersectionMessage: (
      listener: (event: MessageEvent<IntersectionWorkerResponse>) => void,
    ): void => {
      intersectionWorker.removeEventListener('message', listener);
    },

    // Common operations
    get isGeoJsonAvailable(): boolean {
      return geoJsonWorker.isAvailable;
    },

    get isIntersectionAvailable(): boolean {
      return intersectionWorker.isAvailable;
    },

    terminate: (): void => {
      geoJsonWorker.terminate();
      intersectionWorker.terminate();
    },
  };
}

// Singleton instance for global use
let mapWorkerInstance: MapWorkerManager | null = null;

/**
 * Get the singleton map worker manager instance
 */
export function getMapWorkerManager(): MapWorkerManager {
  mapWorkerInstance ??= createMapWorkerManager();
  return mapWorkerInstance;
}
