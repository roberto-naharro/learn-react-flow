import { useContext } from 'react';

import { EdgesContext, type EdgesContextType } from '../context/EdgesContext';

export const useEdgesContext = (): EdgesContextType => {
  const context = useContext(EdgesContext);

  if (!context) {
    throw new Error('useEdgesContext must be used within an EdgesProvider');
  }

  return context;
};
