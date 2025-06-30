import { useEffect, useState } from 'react';

import { fetchGeoJsonData, updateGeojsonCache } from '../utils/mapUtils';

import type { ConnectedLayer, GeojsonCache } from '../types';

/**
 * Hook to manage GeoJSON data caching
 */
export function useGeojsonCache(connectedLayers: ConnectedLayer[]) {
  const [geojsonCache, setGeojsonCache] = useState<GeojsonCache>({});

  useEffect(() => {
    const urls = Array.from(new Set(connectedLayers.map((l) => l.sourceUrl)));

    urls.forEach(async (url) => {
      if (!geojsonCache[url]) {
        const data = await fetchGeoJsonData(url);
        updateGeojsonCache(setGeojsonCache, url, data);
      }
    });
  }, [connectedLayers, geojsonCache]);

  return geojsonCache;
}
