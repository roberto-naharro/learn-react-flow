import { createContext } from 'react';

import type { Connection, Edge, Node, OnEdgesChange, OnNodesChange } from '@xyflow/react';

/**
 * Unified context type for diagram data including nodes and edges
 * Combines NodesContextType and EdgesContextType interfaces
 */
export interface DiagramDataContextType {
  // Node state and operations
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: object) => void;
  // Edge state and operations
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
}

export const DiagramDataContext = createContext<DiagramDataContextType | undefined>(undefined);
