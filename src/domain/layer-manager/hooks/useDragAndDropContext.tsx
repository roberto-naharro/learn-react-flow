import { useContext } from 'react';

import { DragAndDropContext, type DragAndDropContextType } from '../context/DragAndDropContext';

export const useDragAndDropContext = (): DragAndDropContextType => {
  const context = useContext(DragAndDropContext);

  if (context === undefined) {
    throw new Error('useDragAndDropContext must be used within a DragAndDropProvider');
  }

  return context;
};
