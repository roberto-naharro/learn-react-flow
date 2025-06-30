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
      .filter((n) => n.type === NODE_LAYER_TYPE_NAME)
      .map((layerNode) => {
        const url = getConnectedSourceUrl(layerNode.id, edges, nodes);
        return url ? { ...layerNode, sourceUrl: url } : null;
      })
      .filter((layerNode) => layerNode !== null)
      .sort((a, b) => b.position.y - a.position.y);
  }, [nodes, edges]);
}
