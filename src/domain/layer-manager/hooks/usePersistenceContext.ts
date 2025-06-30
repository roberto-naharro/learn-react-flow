import { useContext } from 'react';

import { PersistenceContext, type PersistenceContextType } from '../context/PersistenceContext';

export const usePersistenceContext = (): PersistenceContextType => {
  const context = useContext(PersistenceContext);

  if (!context) {
    throw new Error('usePersistenceContext must be used within a PersistenceProvider');
  }

  return context;
};
