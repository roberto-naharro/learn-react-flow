import type { FetchGeoJsonMessage, GeoJsonWorkerResponse } from '../../../shared/workers/types';

// Listen for messages from the main thread
self.addEventListener('message', async (event: MessageEvent<FetchGeoJsonMessage>) => {
  const { type, url } = event.data;

  if (type === 'FETCH_GEOJSON') {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Send the successful result back to the main thread
      const workerResponse: GeoJsonWorkerResponse = { type: 'GEOJSON_SUCCESS', url, data };
      self.postMessage(workerResponse);
    } catch (error) {
      // Send the error back to the main thread
      const errorMessage = error instanceof Error ? error.message : String(error);
      const workerResponse: GeoJsonWorkerResponse = {
        type: 'GEOJSON_ERROR',
        url,
        error: errorMessage,
      };
      self.postMessage(workerResponse);
    }
  }
});

// Add this to satisfy TypeScript when using with worker-loader
export default {} as typeof Worker & (new () => Worker);
