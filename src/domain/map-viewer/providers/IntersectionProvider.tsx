import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getIntersectionWorkerManager } from '../../../shared/workers/intersectionWorkerManager';
import { useEdgesContext } from '../../flow/hooks/useEdgesContext';
import { useNodesContext } from '../../flow/node/hooks/useNodesContext';
import { IntersectionContext } from '../context/IntersectionContext';
import { useGeoJsonContext } from '../hooks/useGeoJsonContext';

import type { IntersectionWorkerResponse } from '../../../shared/workers/types';
import type { IntersectionCache } from '../context/IntersectionContext';
import type { Edge, Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

const workerManager = getIntersectionWorkerManager();

type IntersectionProviderProps = {
  children: ReactNode;
};

/**
 * Retrieves the source nodes that are connected to the specified target node via edges,
 * filtering only those source nodes that have a defined `data.url` property.
 *
 * @param node - The target node for which to find connected source nodes.
 * @param edges - The list of edges representing connections between nodes.
 * @param currentNodes - The list of all current nodes to search for source nodes.
 * @returns An array of source nodes that are connected to the given node and have a `data.url` property.
 */
const getConnectedSources = (node: Node, edges: Edge[], currentNodes: Node[]) => {
  const connectedEdges = edges.filter((edge) => edge.target === node.id);
  return connectedEdges
    .map((edge) => currentNodes.find((n) => n.id === edge.source))
    .filter((sourceNode) => sourceNode?.data?.url);
};

/**
 * Processes a given intersection node, checking its connected sources and determining if
 * it needs to compute the intersection of two geometries.
 *
 * @param node - The intersection node to process.
 * @param edges - The list of edges connecting nodes.
 * @param currentNodes - The list of all current nodes in the flow.
 * @param intersectionCache - Cache storing previously computed intersections.
 * @param computeIntersection - Function to compute the intersection of two geometries.
 * @returns An object containing the updated node and a boolean indicating if changes were made.
 */
const processIntersectionNode = (
  node: Node,
  edges: Edge[],
  currentNodes: Node[],
  intersectionCache: IntersectionCache,
  computeIntersection: (
    nodeId: string,
    geoA: FeatureCollection<Geometry, GeoJsonProperties>,
    geoB: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void,
): { updatedNode: Node; hasChanges: boolean } => {
  if (node.type !== 'intersection') {
    return { updatedNode: node, hasChanges: false };
  }

  const connectedSources = getConnectedSources(node, edges, currentNodes);

  if (connectedSources.length !== 2) {
    const errorMessage = 'Needs exactly 2 sources';
    if (node.data?.geojsonError !== errorMessage) {
      return {
        updatedNode: {
          ...node,
          data: {
            ...node.data,
            geojsonError: errorMessage,
            status: undefined,
          },
        },
        hasChanges: true,
      };
    }
    return { updatedNode: node, hasChanges: false };
  }

  const firstSourceNode = connectedSources[0];
  const secondSourceNode = connectedSources[1];
  const areBothSourcesReady =
    firstSourceNode?.data?.geojsonData && secondSourceNode?.data?.geojsonData;
  const isAlreadyComputed = intersectionCache[node.id] || node.data?.geojsonData;
  const isLoading = node.data?.status === 'loading';

  if (areBothSourcesReady && !isAlreadyComputed && !isLoading) {
    setTimeout(() => {
      computeIntersection(
        node.id,
        firstSourceNode.data.geojsonData as FeatureCollection<Geometry, GeoJsonProperties>,
        secondSourceNode.data.geojsonData as FeatureCollection<Geometry, GeoJsonProperties>,
      );
    }, 0);

    return {
      updatedNode: {
        ...node,
        data: {
          ...node.data,
          geojsonError: undefined,
          status: 'loading' as const,
        },
      },
      hasChanges: true,
    };
  }

  return { updatedNode: node, hasChanges: false };
};

export const IntersectionProvider = ({ children }: IntersectionProviderProps) => {
  const [intersectionCache, setIntersectionCache] = useState<IntersectionCache>({});
  const { nodes, setNodes } = useNodesContext();
  const { edges } = useEdgesContext();
  useGeoJsonContext();

  const computeIntersection = useCallback(
    (
      nodeId: string,
      geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
      geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
    ) => {
      if (!workerManager.isAvailable) return;
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

  const createUpdatedIntersectionNode = useCallback(
    (
      node: Node,
      nodeId: string,
      data?: FeatureCollection<Geometry, GeoJsonProperties>,
      error?: string,
    ) => {
      if (node.id !== nodeId) return node;

      let status: 'ready' | undefined;
      if (data) {
        status = 'ready' as const;
      } else if (error) {
        status = undefined;
      } else {
        status = node.data?.status as 'ready' | undefined;
      }

      return {
        ...node,
        data: {
          ...node.data,
          geojsonData: data,
          geojsonError: error,
          status,
        },
      };
    },
    [],
  );

  const updateIntersectionNode = useCallback(
    (nodeId: string, data?: FeatureCollection<Geometry, GeoJsonProperties>, error?: string) => {
      if (data) {
        setIntersectionCache((cache) => ({ ...cache, [nodeId]: data }));
      }

      setNodes((currentNodes) =>
        currentNodes.map((node) => createUpdatedIntersectionNode(node, nodeId, data, error)),
      );
    },
    [setNodes, createUpdatedIntersectionNode],
  );

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

  // Main effect to process intersection nodes and trigger computations
  // Validates each intersection has exactly 2 sources and initiates computation when ready
  useEffect(() => {
    if (!workerManager.isAvailable) return;

    setNodes((currentNodes) => {
      let hasAnyChanges = false;
      const updatedNodes = currentNodes.map((node) => {
        const { updatedNode, hasChanges } = processIntersectionNode(
          node,
          edges,
          currentNodes,
          intersectionCache,
          computeIntersection,
        );
        if (hasChanges) hasAnyChanges = true;
        return updatedNode;
      });

      return hasAnyChanges ? updatedNodes : currentNodes;
    });
  }, [nodes, edges, intersectionCache, computeIntersection, setNodes]);

  const contextValue = useMemo(
    () => ({ intersectionCache, computeIntersection }),
    [intersectionCache, computeIntersection],
  );

  return (
    <IntersectionContext.Provider value={contextValue}>{children}</IntersectionContext.Provider>
  );
};
