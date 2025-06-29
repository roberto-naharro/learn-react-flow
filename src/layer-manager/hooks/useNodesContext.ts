import { useContext } from 'react';

import { NodesContext, type NodesContextType } from '../context/NodesContext';

export const useNodesContext = (): NodesContextType => {
  const context = useContext(NodesContext);

  if (!context) {
    throw new Error('useNodesContext must be used within a NodesProvider');
  }

  return context;
};
