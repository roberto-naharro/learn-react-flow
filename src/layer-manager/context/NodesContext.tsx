import { createContext } from 'react';

import type { Node, OnNodesChange } from '@xyflow/react';

export interface NodesContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void;
  updateNodeData: (nodeId: string, data: object) => void;
}

export const NodesContext = createContext<NodesContextType | undefined>(undefined);
