import { Panel } from '@xyflow/react';

import { controlPanelStyles } from './ControlPanel.styles';
import { NodePalette } from './NodePalette/NodePalette';

export const ControlPanel = () => {
  const styles = controlPanelStyles;

  return (
    <Panel position="top-left">
      <div style={styles.container}>
        <h2 style={styles.heading}>Flow Diagram</h2>

        {/* Node Palette */}
        <div style={styles.paletteContainer}>
          <h3 style={styles.subheading}>Drag Nodes</h3>
          <NodePalette />
        </div>

        {/* Instructions */}
        <div style={styles.instructions}>
          <p>Drag and drop nodes from the palette.</p>
          <p>Connect nodes by dragging between handles.</p>
          <p>Delete nodes or edges with Delete/Backspace.</p>
        </div>
      </div>
    </Panel>
  );
};
