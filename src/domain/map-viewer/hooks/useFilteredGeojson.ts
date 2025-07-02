import { useGeoJsonContext } from './useGeoJsonContext';
import { useIntersectionContext } from './useIntersectionContext';

import type { ConnectedLayer, GeojsonCache } from '../types';

/**
 * Hook to filter GeoJSON data from both URL and intersection caches based on connected layers
 * This doesn't perform caching but returns a filtered subset of the central caches
 */
export function useFilteredGeojson(connectedLayers: ConnectedLayer[]): GeojsonCache {
  const { geojsonCache } = useGeoJsonContext();
  const { intersectionCache } = useIntersectionContext();

  // Filter cache to include only entries relevant to connected layers
  const filteredCache = connectedLayers.reduce((cache, layer) => {
    if (layer.sourceUrl.startsWith('intersection:')) {
      // Handle intersection data
      const nodeId = layer.sourceUrl.replace('intersection:', '');
      const data = intersectionCache[nodeId];
      if (data !== undefined) {
        cache[layer.sourceUrl] = data;
      }
    } else {
      // Handle regular URL data
      const data = geojsonCache[layer.sourceUrl];
      if (data !== undefined) {
        cache[layer.sourceUrl] = data;
      }
    }
    return cache;
  }, {} as GeojsonCache);

  return filteredCache;
}
