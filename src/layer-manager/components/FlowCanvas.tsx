import {
  Background,
  BackgroundVariant,
  type Connection,
  ConnectionLineType,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
  ReactFlow,
} from '@xyflow/react';

import { ControlPanel } from './ControlPanel';

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  nodeName: string;
  setNodeName: (name: string) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
  addNode: () => void;
}

export const FlowCanvas = ({
  nodes,
  edges,
  nodeName,
  setNodeName,
  onNodesChange,
  onEdgesChange,
  onConnect,
  addNode,
}: FlowCanvasProps) => {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.Bezier}
      fitView
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <ControlPanel nodeName={nodeName} setNodeName={setNodeName} addNode={addNode} />
    </ReactFlow>
  );
};
