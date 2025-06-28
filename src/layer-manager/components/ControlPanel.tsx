import { Panel } from '@xyflow/react';

import { controlPanelStyles } from '../styles/components';

interface ControlPanelProps {
  nodeName: string;
  setNodeName: (name: string) => void;
  addNode: () => void;
}

export const ControlPanel = ({ nodeName, setNodeName, addNode }: ControlPanelProps) => {
  return (
    <Panel position="top-left" className="controls">
      <div style={controlPanelStyles.controls}>
        <h1 style={controlPanelStyles.title}>React Flow Example</h1>
        <div style={controlPanelStyles.inputContainer}>
          <input
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder="Enter node name"
            style={controlPanelStyles.input}
          />
          <button onClick={addNode} style={controlPanelStyles.button}>
            Add Node
          </button>
        </div>
        <p style={controlPanelStyles.infoText}>
          You can drag nodes, connect them, and add new ones!
        </p>
      </div>
    </Panel>
  );
};
