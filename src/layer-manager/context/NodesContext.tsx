import { createContext } from 'react';

import type { Node, OnNodesChange } from '@xyflow/react';

export interface NodesContextType {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  addNode: (node: Node) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export const NodesContext = createContext<NodesContextType | undefined>(undefined);
