import { useGeoJsonContext } from './useGeoJsonContext';
import { useIntersectionContext } from './useIntersectionContext';

import type { ConnectedLayer, GeojsonCache } from '../types';

/**
 * Merges GeoJSON data from both direct sources and intersection results based on connected layers.
 * Handles different source URL patterns to route data from appropriate caches.
 *
 * @param connectedLayers - Layer nodes with their connected source URLs
 * @returns Unified cache containing all relevant GeoJSON data for map rendering
 */
export function useFilteredGeojson(connectedLayers: ConnectedLayer[]): GeojsonCache {
  const { geojsonCache } = useGeoJsonContext();
  const { intersectionCache } = useIntersectionContext();

  const filteredCache = connectedLayers.reduce((cache, layer) => {
    if (layer.sourceUrl.startsWith('intersection:')) {
      const nodeId = layer.sourceUrl.replace('intersection:', '');
      const data = intersectionCache[nodeId];
      if (data !== undefined) {
        cache[layer.sourceUrl] = data;
      }
    } else {
      const data = geojsonCache[layer.sourceUrl];
      if (data !== undefined) {
        cache[layer.sourceUrl] = data;
      }
    }
    return cache;
  }, {} as GeojsonCache);

  return filteredCache;
}
