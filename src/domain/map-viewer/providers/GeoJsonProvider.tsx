import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { useEdgesContext } from '../../flow/hooks/useEdgesContext';
import { useNodesContext } from '../../flow/node/hooks/useNodesContext';
import { GeoJsonContext } from '../context/GeoJsonContext';
import { useConnectedLayers } from '../hooks/useConnectedLayers';

import type { GeojsonCache } from '../types';

// Create a worker
let worker: Worker | null = null;

// Initialize the worker (only in browser environment)
if (typeof window !== 'undefined' && window.Worker) {
  worker = new Worker(new URL('../workers/geoJsonWorker.ts', import.meta.url), { type: 'module' });
}

type GeoJsonProviderProps = {
  children: ReactNode;
};

export const GeoJsonProvider = ({ children }: GeoJsonProviderProps) => {
  const [geojsonCache, setGeojsonCache] = useState<GeojsonCache>({});
  const { nodes, setNodes } = useNodesContext();
  const { edges } = useEdgesContext();
  const connectedLayers = useConnectedLayers(nodes, edges);

  // Add useCallback to memoize fetchGeoJson
  const fetchGeoJson = useCallback((url: string) => {
    if (!worker) return;

    worker.postMessage({
      type: 'FETCH_GEOJSON',
      url,
    });
  }, []);

  // Set up worker message handler
  useEffect(() => {
    if (!worker) return;

    const handleWorkerMessage = (event: MessageEvent) => {
      const { url, data, error } = event.data;

      // Update the geojson cache
      setGeojsonCache((cache) => ({ ...cache, [url]: data }));

      // Update the nodes that use this source URL
      setNodes((currentNodes) => {
        return currentNodes.map((node) => {
          // Check if node is a source with this URL or a layer connected to this source
          const isSourceWithUrl = node.data?.url === url;
          const connectedLayer = connectedLayers.find(
            (layer) => layer.sourceUrl === url && layer.id === node.id,
          );

          if (isSourceWithUrl || connectedLayer) {
            return {
              ...node,
              data: {
                ...node.data,
                geojsonData: data,
                geojsonError: error,
              },
            };
          }
          return node;
        });
      });
    };

    worker.addEventListener('message', handleWorkerMessage);

    return () => {
      worker?.removeEventListener('message', handleWorkerMessage);
    };
  }, [connectedLayers, setNodes]);

  // Fetch GeoJSON data for connected layers
  useEffect(() => {
    if (!worker) return;

    // Extract unique URLs from connected layers to avoid duplicate fetches
    const urls = Array.from(new Set(connectedLayers.map((l) => l.sourceUrl)));

    // Fetch GeoJSON data for each unique URL that's not already cached
    urls.forEach((url) => {
      if (!geojsonCache[url]) {
        fetchGeoJson(url);
      }
    });
  }, [connectedLayers, geojsonCache, fetchGeoJson]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ geojsonCache, fetchGeoJson }),
    [geojsonCache, fetchGeoJson],
  );

  return <GeoJsonContext.Provider value={contextValue}>{children}</GeoJsonContext.Provider>;
};
