import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getIntersectionWorkerManager } from '../../../shared/workers/intersectionWorkerManager';
import { useEdgesContext } from '../../flow/hooks/useEdgesContext';
import { useNodesContext } from '../../flow/node/hooks/useNodesContext';
import { IntersectionContext } from '../context/IntersectionContext';
import { useGeoJsonContext } from '../hooks/useGeoJsonContext';

import type { IntersectionWorkerResponse } from '../../../shared/workers/types';
import type { IntersectionCache } from '../context/IntersectionContext';
import type { Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

// Get the worker manager instance
const workerManager = getIntersectionWorkerManager();

type IntersectionProviderProps = {
  children: ReactNode;
};

export const IntersectionProvider = ({ children }: IntersectionProviderProps) => {
  const [intersectionCache, setIntersectionCache] = useState<IntersectionCache>({});
  const { nodes, setNodes } = useNodesContext();
  const { edges } = useEdgesContext();
  useGeoJsonContext(); // Keep context active

  const computeIntersection = useCallback(
    (
      nodeId: string,
      geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
      geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
    ) => {
      if (!workerManager.isAvailable) return;

      // Set loading status
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  status: 'loading' as const,
                  geojsonError: undefined,
                },
              }
            : node,
        ),
      );

      workerManager.computeIntersection(nodeId, geojsonA, geojsonB);
    },
    [setNodes],
  );

  // Helper function to update a single intersection node
  const updateSingleIntersectionNode = useCallback(
    (
      node: Node,
      nodeId: string,
      data?: FeatureCollection<Geometry, GeoJsonProperties>,
      error?: string,
    ) => {
      if (node.id !== nodeId) return node;

      return {
        ...node,
        data: {
          ...node.data,
          geojsonData: data,
          geojsonError: error,
          status: data ? ('ready' as const) : error ? undefined : node.data?.status,
        },
      };
    },
    [],
  );

  // Helper function to update intersection node with result
  const updateIntersectionNode = useCallback(
    (nodeId: string, data?: FeatureCollection<Geometry, GeoJsonProperties>, error?: string) => {
      // Update the intersection cache
      if (data) {
        setIntersectionCache((cache) => ({ ...cache, [nodeId]: data }));
      }

      // Update the node with the result
      setNodes((currentNodes) =>
        currentNodes.map((node) => updateSingleIntersectionNode(node, nodeId, data, error)),
      );
    },
    [setNodes, updateSingleIntersectionNode],
  );

  // Set up worker message handler
  useEffect(() => {
    if (!workerManager.isAvailable) return;

    const handleWorkerMessage = (event: MessageEvent<IntersectionWorkerResponse>) => {
      const { nodeId, data, error } = event.data;
      updateIntersectionNode(nodeId, data, error);
    };

    workerManager.onMessage(handleWorkerMessage);

    return () => {
      workerManager.offMessage(handleWorkerMessage);
    };
  }, [updateIntersectionNode]);

  // Simple intersection processing: compute when both sources have data
  useEffect(() => {
    if (!workerManager.isAvailable) return;

    // Update intersection node status and trigger computation
    setNodes((currentNodes) => {
      let hasChanges = false;
      const updatedNodes = currentNodes.map((node) => {
        if (node.type !== 'intersection') return node;

        // Find connected source nodes
        const connectedEdges = edges.filter((edge) => edge.target === node.id);
        const connectedSources = connectedEdges
          .map((edge) => currentNodes.find((n) => n.id === edge.source))
          .filter((sourceNode) => sourceNode && sourceNode.data && sourceNode.data.url);

        // Check if intersection has wrong number of sources
        if (connectedSources.length !== 2) {
          const errorMessage = 'Needs exactly 2 sources';
          if (node.data?.geojsonError !== errorMessage) {
            hasChanges = true;
            return {
              ...node,
              data: {
                ...node.data,
                geojsonError: errorMessage,
                status: undefined,
              },
            };
          }
          return node;
        }

        // Check if both sources have data and intersection not computed yet
        const sourceA = connectedSources[0];
        const sourceB = connectedSources[1];
        const bothSourcesReady = sourceA?.data?.geojsonData && sourceB?.data?.geojsonData;
        const alreadyComputed = intersectionCache[node.id] || node.data?.geojsonData;
        const isLoading = node.data?.status === 'loading';

        if (bothSourcesReady && !alreadyComputed && !isLoading) {
          // Trigger computation (async)
          setTimeout(() => {
            computeIntersection(
              node.id,
              sourceA.data.geojsonData as FeatureCollection<Geometry, GeoJsonProperties>,
              sourceB.data.geojsonData as FeatureCollection<Geometry, GeoJsonProperties>,
            );
          }, 0);

          // Set loading status immediately
          hasChanges = true;
          return {
            ...node,
            data: {
              ...node.data,
              geojsonError: undefined,
              status: 'loading' as const,
            },
          };
        }

        return node;
      });

      return hasChanges ? updatedNodes : currentNodes;
    });
  }, [nodes, edges, intersectionCache, computeIntersection, setNodes]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ intersectionCache, computeIntersection }),
    [intersectionCache, computeIntersection],
  );

  return (
    <IntersectionContext.Provider value={contextValue}>{children}</IntersectionContext.Provider>
  );
};
