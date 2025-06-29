import * as React from 'react';
import { useCallback } from 'react';

import { AppNode } from './AppNode';
import { nodePaletteStyles } from './NodePalette.styles';

import type { NodeTypes } from './NodeTypes/types';

// Node types that can be dragged onto the canvas
const defaultNodeTypes = [{ type: 'source' }, { type: 'layer' }] as const satisfies NodeTypes;

export type NodePaletteProps = {
  nodeTypes?: NodeTypes;
};
export const NodePalette = ({ nodeTypes = defaultNodeTypes }: NodePaletteProps) => {
  const styles = nodePaletteStyles;

  // Start drag with node type data - Match exactly with React Flow example
  const onDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    // Important: Need to set application/reactflow as the format
    event.dataTransfer.setData('application/reactflow', nodeType);
    // Set allowed effect
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.nodeList}>
        {nodeTypes.map((node) => (
          <AppNode {...node} key={node.type} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};

export default NodePalette;
