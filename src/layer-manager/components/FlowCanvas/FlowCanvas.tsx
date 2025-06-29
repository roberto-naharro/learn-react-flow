import { useMemo, useRef } from 'react';

import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

import { flowCanvasStyles } from './FlowCanvas.styles';
import { useDragDrop } from '../../hooks/useDragDrop';
import { useEdgesContext } from '../../hooks/useEdgesContext';
import { useNodesContext } from '../../hooks/useNodesContext';
import { usePersistenceContext } from '../../hooks/usePersistenceContext';
import { getNodeTypes } from '../../nodes/nodeTypes';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { ControlPanel } from '../ControlPanel/ControlPanel';

export const FlowCanvas = () => {
  const styles = flowCanvasStyles;
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { nodes, onNodesChange, updateNodeData } = useNodesContext();
  const { edges, onEdgesChange, onConnect } = useEdgesContext();
  const { setReactFlowInstance: setRfInstance } = usePersistenceContext();
  const { onDrop, onDragOver } = useDragDrop();

  // Correctly generate nodeTypes with injected onUrlChange for SourceCustomNode
  const nodeTypes = useMemo(() => {
    // Provide a custom prop for the source node type
    return getNodeTypes({
      source: {
        onUrlChange: (id: string, url: string) => updateNodeData(id, { url }),
      },
    });
  }, [updateNodeData]);

  return (
    <div style={styles.reactFlowWrapper} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setRfInstance}
        connectionLineType={ConnectionLineType.Bezier}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          style={styles.reactFlowBackground}
          color={styles.dots.color}
        />

        <ControlPanel />
        <ActionPanel />
      </ReactFlow>
    </div>
  );
};
