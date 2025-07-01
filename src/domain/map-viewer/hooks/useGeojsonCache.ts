import { useEffect, useState } from 'react';

import { fetchGeoJsonData, updateGeojsonCache } from '../utils/mapUtils';

import type { ConnectedLayer, GeojsonCache } from '../types';

/**
 * Hook to manage GeoJSON data caching
 */
export function useGeojsonCache(connectedLayers: ConnectedLayer[]) {
  const [geojsonCache, setGeojsonCache] = useState<GeojsonCache>({});

  useEffect(() => {
    // Extract unique URLs from connected layers to avoid duplicate fetches
    const urls = Array.from(new Set(connectedLayers.map((l) => l.sourceUrl)));

    // Fetch GeoJSON data for each unique URL that's not already cached
    // Using forEach with async functions (not awaited) for parallel fetching
    urls.forEach(async (url) => {
      if (!geojsonCache[url]) {
        const data = await fetchGeoJsonData(url);
        updateGeojsonCache(setGeojsonCache, url, data);
      }
    });
  }, [connectedLayers, geojsonCache]);

  return geojsonCache;
}
