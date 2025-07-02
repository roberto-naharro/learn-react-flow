import { useMemo } from 'react';

import { NODE_LAYER_TYPE_NAME } from '../../flow/node/components/LayerCustomNode';
import { getConnectedSourceUrl } from '../utils/mapUtils';

import type { ConnectedLayer } from '../types';
import type { Edge, Node } from '@xyflow/react';

/**
 * Hook to get layer nodes that are connected to source nodes
 */
export function useConnectedLayers(nodes: Node[], edges: Edge[]): ConnectedLayer[] {
  return useMemo(() => {
    return nodes
      .filter((node) => node.type === NODE_LAYER_TYPE_NAME)
      .map((layerNode) => {
        // Augment layer nodes with their connected source URL
        const sourceUrl = getConnectedSourceUrl(layerNode.id, edges, nodes);
        return sourceUrl ? { ...layerNode, sourceUrl } : null;
      })
      .filter((layerNode) => layerNode !== null) // Remove unconnected layers
      .sort((layerA, layerB) => layerB.position.y - layerA.position.y);
  }, [nodes, edges]);
}
