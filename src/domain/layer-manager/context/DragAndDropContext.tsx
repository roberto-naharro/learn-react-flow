import { createContext } from 'react';
import type * as React from 'react';

export type DragAndDropContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
];

export const DragAndDropContext = createContext<DragAndDropContextType | undefined>(undefined);
