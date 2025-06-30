import { createContext } from 'react';

import type { Connection, Edge, OnEdgesChange } from '@xyflow/react';

export interface EdgesContextType {
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection) => void;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const EdgesContext = createContext<EdgesContextType | undefined>(undefined);
