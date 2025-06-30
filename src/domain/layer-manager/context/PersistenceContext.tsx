import { createContext } from 'react';

import type { ReactFlowInstance } from '@xyflow/react';

export interface PersistenceContextType {
  saveFlowState: () => boolean;
  restoreFlowState: () => void;
  resetFlowState: () => void;
  setReactFlowInstance: (instance: ReactFlowInstance) => void;
}

export const PersistenceContext = createContext<PersistenceContextType | undefined>(undefined);
