import { useMemo, useRef } from 'react';

import {
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  MiniMap,
  ReactFlow,
} from '@xyflow/react';

import { useEdgesContext, useNodesContext } from '@domain-flow/hooks/useDiagramData';
import { getNodeTypes } from '@domain-flow/node/components/nodeTypes';

import { ActionPanel } from '@domain-layer-manager/components/ActionPanel/ActionPanel';
import { ControlPanel } from '@domain-layer-manager/components/ControlPanel/ControlPanel';
import { flowCanvasStyles } from '@domain-layer-manager/components/FlowCanvas/FlowCanvas.styles';
import { useDragDrop } from '@domain-layer-manager/hooks/useDragDrop';
import { usePersistenceContext } from '@domain-layer-manager/hooks/usePersistenceContext';

export const FlowCanvas = () => {
  const styles = flowCanvasStyles;
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const { nodes, onNodesChange, updateNodeData } = useNodesContext();
  const { edges, onEdgesChange, onConnect } = useEdgesContext();
  const { setReactFlowInstance: setRfInstance } = usePersistenceContext();
  const { onDrop, onDragOver } = useDragDrop();

  // Generate React Flow node types with dependency injection
  // The source node type needs access to updateNodeData callback for URL changes
  // This pattern allows us to inject context-dependent callbacks into isolated node components
  const nodeTypes = useMemo(() => {
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
