import { createWorkerManagerFromUrl } from './workerManager';

import type { FetchGeoJsonMessage, GeoJsonWorkerResponse, WorkerManager } from './types';

/**
 * GeoJSON worker manager interface
 */
export interface GeoJsonWorkerManager {
  fetchGeoJson: (url: string) => void;
  onMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void) => void;
  offMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void) => void;
  isAvailable: boolean;
  terminate: () => void;
}

/**
 * Creates a GeoJSON worker manager
 */
export function createGeoJsonWorkerManager(): GeoJsonWorkerManager {
  const workerManager: WorkerManager<FetchGeoJsonMessage, GeoJsonWorkerResponse> =
    createWorkerManagerFromUrl('../../domain/map-viewer/workers/geoJsonWorker.ts');

  return {
    fetchGeoJson: (url: string): void => {
      const message: FetchGeoJsonMessage = {
        type: 'FETCH_GEOJSON',
        url,
      };
      workerManager.postMessage(message);
    },

    onMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void): void => {
      workerManager.addEventListener('message', listener);
    },

    offMessage: (listener: (event: MessageEvent<GeoJsonWorkerResponse>) => void): void => {
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
let geoJsonWorkerInstance: GeoJsonWorkerManager | null = null;

/**
 * Get the singleton GeoJSON worker manager instance
 */
export function getGeoJsonWorkerManager(): GeoJsonWorkerManager {
  if (!geoJsonWorkerInstance) {
    geoJsonWorkerInstance = createGeoJsonWorkerManager();
  }
  return geoJsonWorkerInstance;
}
