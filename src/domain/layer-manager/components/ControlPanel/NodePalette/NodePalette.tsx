import * as React from 'react';
import { useCallback } from 'react';

import { nodePaletteStyles } from './NodePalette.styles';
import { SingleNodePalette } from './SingleNodePalette';

import type { NodePaletteTypes } from './NodeTypes/types';

// Node types that can be dragged onto the canvas
const defaultNodeTypes = [
  { type: 'source' },
  { type: 'layer' },
] as const satisfies NodePaletteTypes;

export type NodePaletteProps = {
  nodeTypes?: NodePaletteTypes;
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
    <div style={styles.paletteContainer}>
      <div style={styles.nodeTypesList}>
        {nodeTypes.map((node) => (
          <SingleNodePalette {...node} key={node.type} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};

export default NodePalette;
