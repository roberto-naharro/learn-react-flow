import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { getMapWorkerManager } from '@domain-map-viewer/workers/mapWorkerManager';
import type {
  GeoJsonWorkerResponse,
  IntersectionWorkerResponse,
} from '@domain-map-viewer/workers/types';

import type { Edge, Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

const mapWorkerManager = getMapWorkerManager();

type NodeState = 'loading' | 'ready' | 'error' | 'computing';

type LayerData = {
  id: string;
  data: FeatureCollection<Geometry, GeoJsonProperties> | null;
  error?: string;
};

type MapDataProcessorContextValue = {
  mapData: LayerData[];
  mapState: Record<string, NodeState>;
  startProcessing: (nodes: Node[], edges: Edge[]) => void;
  getNodeState: (nodeId: string) => NodeState | undefined;
  getNodeError: (nodeId: string) => string | undefined;
  isProcessingComplete: boolean;
  clearState: () => void;
};

const MapDataProcessorContext = createContext<MapDataProcessorContextValue | null>(null);

type MapDataProcessorProviderProps = {
  children: ReactNode;
};

/**
 * Maintains mapData (ordered layer results) and mapState (node processing states)
 * Takes topology snapshot on navigation, processes independently
 */
export const MapDataProcessorProvider = ({ children }: MapDataProcessorProviderProps) => {
  const [mapData, setMapData] = useState<LayerData[]>([]);
  const [mapState, setMapState] = useState<Record<string, NodeState>>({});
  const [nodeErrors, setNodeErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Internal caches for processing
  const [geojsonCache, setGeojsonCache] = useState<
    Record<string, FeatureCollection<Geometry, GeoJsonProperties> | null>
  >({});
  const [intersectionCache, setIntersectionCache] = useState<
    Record<string, FeatureCollection<Geometry, GeoJsonProperties>>
  >({});

  // Store topology snapshot when processing starts
  const [processingTopology, setProcessingTopology] = useState<{
    nodes: Node[];
    edges: Edge[];
  } | null>(null);

  const getNodeState = useCallback((nodeId: string) => mapState[nodeId], [mapState]);

  const getNodeError = useCallback((nodeId: string) => nodeErrors[nodeId], [nodeErrors]);

  const isProcessingComplete = useMemo(() => {
    if (!isProcessing) return true;
    const activeStates = Object.values(mapState);
    return !activeStates.some((state) => state === 'loading' || state === 'computing');
  }, [mapState, isProcessing]);

  const clearState = useCallback(() => {
    setMapData([]);
    setMapState({});
    setNodeErrors({});
    setIsProcessing(false);
    setGeojsonCache({});
    setIntersectionCache({});
    setProcessingTopology(null);
  }, []);

  /**
   * @param nodes - All diagram nodes
   * @returns Layer nodes sorted by visual order
   */
  const getOrderedLayers = useCallback((nodes: Node[]) => {
    return nodes
      .filter((node) => node.type === 'layer')
      .sort((a, b) => a.position.y - b.position.y); // Top layers first
  }, []);

  /**
   * Find what a layer connects to (source or intersection)
   * @param layerId - Layer node ID
   * @param edges - Diagram edges
   * @param nodes - Diagram nodes
   * @returns Source or intersection connection info
   */
  const getLayerSource = useCallback((layerId: string, edges: Edge[], nodes: Node[]) => {
    const incomingEdge = edges.find((edge) => edge.target === layerId);
    if (!incomingEdge) return null;

    const sourceNode = nodes.find((node) => node.id === incomingEdge.source);
    if (!sourceNode) return null;

    if (sourceNode.type === 'source' && sourceNode.data?.url) {
      return { type: 'source' as const, url: sourceNode.data.url as string, nodeId: sourceNode.id };
    }

    if (sourceNode.type === 'intersection') {
      return { type: 'intersection' as const, nodeId: sourceNode.id };
    }

    return null;
  }, []);

  /**
   * Get intersection sources (should be exactly 2)
   * @param intersectionId - Intersection node ID
   * @param edges - Diagram edges
   * @param nodes - Diagram nodes
   * @returns Array of source connections for intersection
   */
  const getIntersectionSources = useCallback(
    (intersectionId: string, edges: Edge[], nodes: Node[]) => {
      const incomingEdges = edges.filter((edge) => edge.target === intersectionId);
      return incomingEdges
        .map((edge) => {
          const sourceNode = nodes.find((node) => node.id === edge.source);
          if (!sourceNode) return null;

          if (sourceNode.type === 'source' && sourceNode.data?.url) {
            return {
              type: 'source' as const,
              url: sourceNode.data.url as string,
              nodeId: sourceNode.id,
            };
          }

          if (sourceNode.type === 'intersection') {
            return { type: 'intersection' as const, nodeId: sourceNode.id };
          }

          return null;
        })
        .filter(Boolean);
    },
    [],
  );

  /**
   * Recursively discover all required sources for processing
   * @param nodes - Diagram nodes
   * @param edges - Diagram edges
   * @returns Required URLs and intersection IDs for processing
   */
  const discoverAllSources = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      const requiredUrls = new Set<string>();
      const requiredIntersections = new Set<string>();

      const processNode = (nodeId: string, nodeType: string) => {
        if (nodeType === 'source') {
          const node = nodes.find((n) => n.id === nodeId);
          if (node?.data?.url) {
            requiredUrls.add(node.data.url as string);
          }
        } else if (nodeType === 'intersection') {
          requiredIntersections.add(nodeId);
          const sources = getIntersectionSources(nodeId, edges, nodes);
          sources.forEach((source) => {
            if (source) {
              processNode(source.nodeId, source.type);
              if (source.type === 'source') {
                requiredUrls.add(source.url);
              }
            }
          });
        }
      };

      // Start from layers and work backwards
      const layers = getOrderedLayers(nodes);
      layers.forEach((layer) => {
        const source = getLayerSource(layer.id, edges, nodes);
        if (source) {
          processNode(source.nodeId, source.type);
          if (source.type === 'source') {
            requiredUrls.add(source.url);
          }
        }
      });

      return {
        requiredUrls: Array.from(requiredUrls),
        requiredIntersections: Array.from(requiredIntersections),
      };
    },
    [getOrderedLayers, getLayerSource, getIntersectionSources],
  );

  /**
   * @param nodes - Current diagram nodes
   * @param edges - Current diagram edges
   */
  const startProcessing = useCallback(
    (nodes: Node[], edges: Edge[]) => {
      // Take topology snapshot for independent processing
      const topologySnapshot = { nodes: [...nodes], edges: [...edges] };
      setProcessingTopology(topologySnapshot);

      // Initialize mapData with ordered empty layer slots
      const orderedLayers = getOrderedLayers(nodes);
      const initialMapData: LayerData[] = orderedLayers.map((layer) => ({
        id: layer.id,
        data: null,
      }));

      setMapData(initialMapData);
      setMapState({});
      setNodeErrors({});
      setIsProcessing(true);
      setGeojsonCache({});
      setIntersectionCache({});

      // Discover all required sources
      const { requiredUrls, requiredIntersections } = discoverAllSources(nodes, edges);

      // Set initial states for all nodes that will be processed
      const initialStates: Record<string, NodeState> = {};

      requiredUrls.forEach((url) => {
        const sourceNodes = nodes.filter((node) => node.data?.url === url);
        sourceNodes.forEach((node) => {
          initialStates[node.id] = 'loading';
        });
      });

      requiredIntersections.forEach((intersectionId) => {
        initialStates[intersectionId] = 'loading';
      });

      setMapState(initialStates);

      requiredUrls.forEach((url) => {
        mapWorkerManager.fetchGeoJson(url);
      });
    },
    [getOrderedLayers, discoverAllSources],
  );

  // GeoJSON worker message handler
  useEffect(() => {
    if (!mapWorkerManager.isGeoJsonAvailable || !processingTopology) return;

    const handleGeoJsonMessage = (event: MessageEvent<GeoJsonWorkerResponse>) => {
      const { url, data, error } = event.data;

      setGeojsonCache((prev) => ({ ...prev, [url]: data || null }));

      const affectedNodes = processingTopology.nodes.filter((node) => node.data?.url === url);
      const stateUpdates: Record<string, NodeState> = {};
      const errorUpdates: Record<string, string> = {};

      affectedNodes.forEach((node) => {
        stateUpdates[node.id] = error ? 'error' : 'ready';
        if (error) {
          errorUpdates[node.id] = error;
        }
      });

      setMapState((prev) => ({ ...prev, ...stateUpdates }));
      if (Object.keys(errorUpdates).length > 0) {
        setNodeErrors((prev) => ({ ...prev, ...errorUpdates }));
      }

      if (data && !error) {
        setMapData((prev) =>
          prev.map((layerData) => {
            const layerSource = getLayerSource(
              layerData.id,
              processingTopology.edges,
              processingTopology.nodes,
            );
            if (layerSource?.type === 'source' && layerSource.url === url) {
              return { ...layerData, data };
            }
            return layerData;
          }),
        );
      }
    };

    mapWorkerManager.onGeoJsonMessage(handleGeoJsonMessage);
    return () => mapWorkerManager.offGeoJsonMessage(handleGeoJsonMessage);
  }, [processingTopology, getLayerSource]);

  // Intersection worker message handler
  useEffect(() => {
    if (!mapWorkerManager.isIntersectionAvailable) return;

    const handleIntersectionMessage = (event: MessageEvent<IntersectionWorkerResponse>) => {
      const { nodeId, data, error } = event.data;

      if (data) {
        setIntersectionCache((prev) => ({ ...prev, [nodeId]: data }));
      }

      setMapState((prev) => ({ ...prev, [nodeId]: error ? 'error' : 'ready' }));

      if (error) {
        setNodeErrors((prev) => ({ ...prev, [nodeId]: error }));
      }

      if (data && !error && processingTopology) {
        setMapData((prev) =>
          prev.map((layerData) => {
            const layerSource = getLayerSource(
              layerData.id,
              processingTopology.edges,
              processingTopology.nodes,
            );
            if (layerSource?.type === 'intersection' && layerSource.nodeId === nodeId) {
              return { ...layerData, data };
            }
            return layerData;
          }),
        );
      }
    };

    mapWorkerManager.onIntersectionMessage(handleIntersectionMessage);
    return () => mapWorkerManager.offIntersectionMessage(handleIntersectionMessage);
  }, [processingTopology, getLayerSource]);

  useEffect(() => {
    if (!mapWorkerManager.isIntersectionAvailable || !processingTopology) return;

    const processIntersectionsRecursively = (intersectionId: string): boolean => {
      if (intersectionCache[intersectionId] || mapState[intersectionId] === 'computing') {
        return intersectionCache[intersectionId] !== undefined;
      }

      const sources = getIntersectionSources(
        intersectionId,
        processingTopology.edges,
        processingTopology.nodes,
      );

      if (sources.length !== 2) {
        setMapState((prev) => ({ ...prev, [intersectionId]: 'error' }));
        setNodeErrors((prev) => ({
          ...prev,
          [intersectionId]: 'Intersection needs exactly 2 sources',
        }));
        return false;
      }

      let sourceAData: FeatureCollection<Geometry, GeoJsonProperties> | null = null;
      let sourceBData: FeatureCollection<Geometry, GeoJsonProperties> | null = null;

      const sourceA = sources[0]!;
      if (sourceA.type === 'source') {
        if (mapState[sourceA.nodeId] !== 'ready') return false;
        sourceAData = geojsonCache[sourceA.url];
      } else if (sourceA.type === 'intersection') {
        if (!processIntersectionsRecursively(sourceA.nodeId)) return false;
        sourceAData = intersectionCache[sourceA.nodeId];
      }

      const sourceB = sources[1]!;
      if (sourceB.type === 'source') {
        if (mapState[sourceB.nodeId] !== 'ready') return false;
        sourceBData = geojsonCache[sourceB.url];
      } else if (sourceB.type === 'intersection') {
        if (!processIntersectionsRecursively(sourceB.nodeId)) return false;
        sourceBData = intersectionCache[sourceB.nodeId];
      }

      if (sourceAData && sourceBData) {
        setMapState((prev) => ({ ...prev, [intersectionId]: 'computing' }));
        mapWorkerManager.computeIntersection(intersectionId, sourceAData, sourceBData);
        return false; // Will be true after computation completes
      }

      return false;
    };

    const orderedLayers = getOrderedLayers(processingTopology.nodes);
    orderedLayers.forEach((layer) => {
      const layerSource = getLayerSource(
        layer.id,
        processingTopology.edges,
        processingTopology.nodes,
      );
      if (layerSource?.type === 'intersection') {
        processIntersectionsRecursively(layerSource.nodeId);
      }
    });
  }, [
    mapState,
    geojsonCache,
    intersectionCache,
    processingTopology,
    getOrderedLayers,
    getLayerSource,
    getIntersectionSources,
  ]);

  const contextValue = useMemo(
    () => ({
      mapData,
      mapState,
      startProcessing,
      getNodeState,
      getNodeError,
      isProcessingComplete,
      clearState,
    }),
    [
      mapData,
      mapState,
      startProcessing,
      getNodeState,
      getNodeError,
      isProcessingComplete,
      clearState,
    ],
  );

  return (
    <MapDataProcessorContext.Provider value={contextValue}>
      {children}
    </MapDataProcessorContext.Provider>
  );
};

export const useMapDataProcessor = (): MapDataProcessorContextValue => {
  const context = useContext(MapDataProcessorContext);
  if (!context) {
    throw new Error('useMapDataProcessor must be used within a MapDataProcessorProvider');
  }
  return context;
};
