import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getGeoJsonWorkerManager } from '../../../shared/workers/geoJsonWorkerManager';
import { useEdgesContext } from '../../flow/hooks/useEdgesContext';
import { NODE_INTERSECTION_TYPE_NAME } from '../../flow/node/components/IntersectionCustomNode';
import { useNodesContext } from '../../flow/node/hooks/useNodesContext';
import { GeoJsonContext } from '../context/GeoJsonContext';
import { useConnectedLayers } from '../hooks/useConnectedLayers';

import type { GeoJsonWorkerResponse } from '../../../shared/workers/types';
import type { GeojsonCache } from '../types';

// Get the worker manager instance
const workerManager = getGeoJsonWorkerManager();

type GeoJsonProviderProps = {
  children: ReactNode;
};

export const GeoJsonProvider = ({ children }: GeoJsonProviderProps) => {
  const [geojsonCache, setGeojsonCache] = useState<GeojsonCache>({});
  const { nodes, setNodes } = useNodesContext();
  const { edges } = useEdgesContext();
  const connectedLayers = useConnectedLayers(nodes, edges);

  /**
   * Determines which GeoJSON URLs need to be fetched based on layer connections.
   * Includes direct layer connections and sources connected to intersections that feed into layers.
   */
  const getUrlsToFetch = useCallback(() => {
    const urls = new Set<string>();

    // Get direct layer connections
    connectedLayers.forEach((layer) => {
      if (layer.sourceUrl && !layer.sourceUrl.startsWith('intersection:')) {
        urls.add(layer.sourceUrl);
      }
    });

    // Get all intersection source URLs (treat them like individual layers)
    const intersectionNodes = nodes.filter((node) => node.type === NODE_INTERSECTION_TYPE_NAME);

    intersectionNodes.forEach((intersectionNode) => {
      // Check if this intersection is connected to any layer
      const isConnectedToLayer = edges.some(
        (edge) =>
          edge.source === intersectionNode.id &&
          nodes.find((n) => n.id === edge.target)?.type === 'layer',
      );

      if (isConnectedToLayer) {
        // Get all source URLs connected to this intersection
        const intersectionSources = edges
          .filter((edge) => edge.target === intersectionNode.id)
          .map((edge) => nodes.find((n) => n.id === edge.source))
          .filter((sourceNode) => sourceNode && sourceNode.data && sourceNode.data.url)
          .map((sourceNode) => sourceNode!.data.url as string);

        intersectionSources.forEach((url) => urls.add(url));
      }
    });

    return Array.from(urls);
  }, [connectedLayers, edges, nodes]);

  /**
   * Updates the loading status of source nodes that match the given URL.
   */
  const setSourceLoadingStatus = useCallback(
    (url: string) => {
      setNodes((currentNodes) => {
        return currentNodes.map((node) => {
          if (node.data?.url === url) {
            return {
              ...node,
              data: {
                ...node.data,
                status: 'loading' as const,
                geojsonError: undefined,
              },
            };
          }
          return node;
        });
      });
    },
    [setNodes],
  );

  const fetchGeoJson = useCallback(
    (url: string) => {
      if (!workerManager.isAvailable) return;

      setSourceLoadingStatus(url);

      workerManager.fetchGeoJson(url);
    },
    [setSourceLoadingStatus],
  );

  // Set up worker message handler
  useEffect(() => {
    if (!workerManager.isAvailable) return;

    const handleWorkerMessage = (event: MessageEvent<GeoJsonWorkerResponse>) => {
      const { url, data, error } = event.data;

      setGeojsonCache((cache) => ({ ...cache, [url]: data || null }));

      // Update the nodes that use this source URL
      setNodes((currentNodes) => {
        return currentNodes.map((node) => {
          // Source node with matching URL should always be updated
          const isSourceWithUrl = node.data?.url === url;

          if (isSourceWithUrl) {
            return {
              ...node,
              data: {
                ...node.data,
                geojsonData: data,
                geojsonError: error,
                status: data ? ('ready' as const) : undefined,
              },
            };
          }

          return node;
        });
      });
    };

    workerManager.onMessage(handleWorkerMessage);

    return () => {
      workerManager.offMessage(handleWorkerMessage);
    };
  }, [setNodes]);

  useEffect(() => {
    if (!workerManager.isAvailable) return;

    const urlsToFetch = getUrlsToFetch();

    urlsToFetch.forEach((url) => {
      if (!geojsonCache[url]) {
        fetchGeoJson(url);
      }
    });
  }, [getUrlsToFetch, geojsonCache, fetchGeoJson]);

  const contextValue = useMemo(
    () => ({ geojsonCache, fetchGeoJson }),
    [geojsonCache, fetchGeoJson],
  );

  return <GeoJsonContext.Provider value={contextValue}>{children}</GeoJsonContext.Provider>;
};
