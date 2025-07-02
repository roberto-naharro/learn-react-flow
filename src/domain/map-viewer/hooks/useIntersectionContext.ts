import { useContext } from 'react';

import { IntersectionContext } from '../context/IntersectionContext';

import type { IntersectionContextType } from '../context/IntersectionContext';

export const useIntersectionContext = (): IntersectionContextType => {
  const context = useContext(IntersectionContext);

  if (!context) {
    throw new Error('useIntersectionContext must be used within an IntersectionProvider');
  }

  return context;
};
