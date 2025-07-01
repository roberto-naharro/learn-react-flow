import { useGeoJsonContext } from './useGeoJsonContext';

import type { ConnectedLayer, GeojsonCache } from '../types';

/**
 * Hook to filter GeoJSON data from the central cache based on connected layers
 * This doesn't perform caching but returns a filtered subset of the central cache
 */
export function useFilteredGeojson(connectedLayers: ConnectedLayer[]): GeojsonCache {
  const { geojsonCache } = useGeoJsonContext();

  // Filter cache to include only entries relevant to connected layers
  const filteredCache = connectedLayers.reduce((cache, layer) => {
    const data = geojsonCache[layer.sourceUrl];
    if (data !== undefined) {
      cache[layer.sourceUrl] = data;
    }
    return cache;
  }, {} as GeojsonCache);

  return filteredCache;
}
