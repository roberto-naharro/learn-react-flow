import { useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';

import { useDragAndDropContext } from './useDragAndDropContext';
import { useNodesContext } from '../../flow/hooks/useDiagramData';

import type { Node } from '@xyflow/react';

export const useDragDrop = () => {
  const { screenToFlowPosition } = useReactFlow();
  const { addNode } = useNodesContext();
  const [draggedNodeType] = useDragAndDropContext();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Uses multiple fallback strategies to determine node type from different data transfer formats.
   */
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      let nodeType = draggedNodeType;
      nodeType ??=
        event.dataTransfer.getData('application/reactflow') ??
        event.dataTransfer.getData('text/plain');

      if (!nodeType) {
        return;
      }

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
