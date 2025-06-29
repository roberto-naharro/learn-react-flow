import { createContext } from 'react';

import type { Node, OnNodesChange } from '@xyflow/react';

export interface NodesContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;
  addNode: (node: Node) => void;
  removeNode: (nodeId: string) => void; // Add removeNode to the type
}

export const NodesContext = createContext<NodesContextType | undefined>(undefined);
