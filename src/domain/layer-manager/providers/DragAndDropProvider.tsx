import { type ReactNode, useMemo, useState } from 'react';

import {
  DragAndDropContext,
  type DragAndDropContextType,
} from '@domain-layer-manager/context/DragAndDropContext';

export const DragAndDropProvider = ({ children }: { children: ReactNode }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const value = useMemo(
    () => [draggedItem, setDraggedItem] as DragAndDropContextType,
    [draggedItem],
  );

  return <DragAndDropContext.Provider value={value}>{children}</DragAndDropContext.Provider>;
};
