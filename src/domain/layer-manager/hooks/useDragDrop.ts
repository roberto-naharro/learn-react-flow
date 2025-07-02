import { useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';

import { useDragAndDropContext } from './useDragAndDropContext';
import { useNodesContext } from '../../flow/node/hooks/useNodesContext';

import type { Node } from '@xyflow/react';

export const useDragDrop = () => {
  const { screenToFlowPosition } = useReactFlow();
  const { addNode } = useNodesContext();
  const [draggedNodeType] = useDragAndDropContext();

  // Handle drag over to allow dropping
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handles drop events to create new nodes in the flow diagram.
   * Uses multiple fallback strategies to determine node type from different data transfer formats.
   */
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // Try to get the node type from multiple sources with fallback priority:
      // 1. Context state (for palette drag operations)
      // 2. React Flow's standard data transfer format
      // 3. Plain text format (browser compatibility fallback)
      let nodeType = draggedNodeType;
      nodeType ??=
        event.dataTransfer.getData('application/reactflow') ??
        event.dataTransfer.getData('text/plain');

      // Check if we have a valid type
      if (!nodeType) {
        return;
      }

      // Get position relative to the viewport
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: nodeType,
        position,
        data: { label: `${nodeType} node` },
      };

      addNode(newNode);
    },
    [draggedNodeType, screenToFlowPosition, addNode],
  );

  return {
    onDragOver,
    onDrop,
  };
};
