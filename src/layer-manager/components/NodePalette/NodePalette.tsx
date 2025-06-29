import * as React from 'react';
import { useCallback } from 'react';

import { nodePaletteStyles } from './NodePalette.styles';

// Node types that can be dragged onto the canvas
const nodeTypes = [
  { type: 'input', label: 'Input Node' },
  { type: 'default', label: 'Default Node' },
  { type: 'output', label: 'Output Node' },
];

export const NodePalette = () => {
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
          <div
            key={node.type}
            style={{
              ...styles.dragAndDropNode,
              cursor: 'grab',
            }}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            className="dndnode"
            tabIndex={0}
            role="button"
            aria-label={`Drag ${node.label}`}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // Simulate drag start on keyboard interaction
                const dragEvent = new DragEvent('dragstart', { bubbles: true });
                event.currentTarget.dispatchEvent(dragEvent);
                onDragStart(dragEvent as unknown as React.DragEvent<HTMLDivElement>, node.type);
              }
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodePalette;
