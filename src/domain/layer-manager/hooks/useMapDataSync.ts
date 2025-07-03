import { useCallback } from 'react';

import { useNodesContext } from '@domain-flow/hooks/useDiagramData';

import { useMapDataProcessor } from '@domain-map-viewer/providers/MapDataProcessor';

/**
 * One-way synchronization hook for map state
 * Reads mapState by node ID when returning from map view
 * Never monitors map state changes - only reads on navigation events
 */
export const useMapDataSync = () => {
  const { getNodeState, getNodeError } = useMapDataProcessor();
  const { setNodes } = useNodesContext();

  /**
   * Updates node appearance with processing states
   * Preserves topology - only affects visual representation
   */
  const syncMapDataToNodes = useCallback(() => {
    setNodes((currentNodes) => {
      return currentNodes.map((node) => {
        const nodeState = getNodeState(node.id);
        const nodeError = getNodeError(node.id);

        if (!nodeState && !nodeError) {
          return node;
        }

        let status = node.data?.status;
        let geojsonData = node.data?.geojsonData;

        if (nodeState === 'ready') {
          status = 'ready' as const;
          geojsonData = geojsonData || { type: 'FeatureCollection', features: [] };
        } else if (nodeState === 'error') {
          status = undefined;
          geojsonData = null;
        } else if (nodeState === 'loading' || nodeState === 'computing') {
          status = 'loading' as const;
          geojsonData = null;
        }

        return {
          ...node,
          data: {
            ...node.data,
            geojsonError: nodeError,
            geojsonData,
            status,
          },
        };
      });
    });
  }, [getNodeState, getNodeError, setNodes]);

  return {
    syncMapDataToNodes,
  };
};
