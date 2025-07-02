import { createWorkerManagerFromUrl } from './workerManager';

import type {
  ComputeIntersectionMessage,
  IntersectionWorkerResponse,
  WorkerManager,
} from './types';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * Intersection worker manager interface
 */
export interface IntersectionWorkerManager {
  computeIntersection: (
    nodeId: string,
    geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
    geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void;
  onMessage: (listener: (event: MessageEvent<IntersectionWorkerResponse>) => void) => void;
  offMessage: (listener: (event: MessageEvent<IntersectionWorkerResponse>) => void) => void;
  isAvailable: boolean;
  terminate: () => void;
}

/**
 * Creates an intersection worker manager
 */
export function createIntersectionWorkerManager(): IntersectionWorkerManager {
  const workerManager: WorkerManager<ComputeIntersectionMessage, IntersectionWorkerResponse> =
    createWorkerManagerFromUrl('../../domain/map-viewer/workers/intersectionWorker.ts');

  return {
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
      workerManager.postMessage(message);
    },

    onMessage: (listener: (event: MessageEvent<IntersectionWorkerResponse>) => void): void => {
      workerManager.addEventListener('message', listener);
    },

    offMessage: (listener: (event: MessageEvent<IntersectionWorkerResponse>) => void): void => {
      workerManager.removeEventListener('message', listener);
    },

    get isAvailable(): boolean {
      return workerManager.isAvailable;
    },

    terminate: (): void => {
      workerManager.terminate();
    },
  };
}

// Singleton instance for global use
let intersectionWorkerInstance: IntersectionWorkerManager | null = null;

/**
 * Get the singleton intersection worker manager instance
 */
export function getIntersectionWorkerManager(): IntersectionWorkerManager {
  intersectionWorkerInstance ??= createIntersectionWorkerManager();
  return intersectionWorkerInstance;
}
