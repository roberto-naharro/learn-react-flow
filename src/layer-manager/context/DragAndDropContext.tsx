import type * as React from 'react';
import { createContext } from 'react';

export type DragAndDropContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
];

export const DragAndDropContext = createContext<DragAndDropContextType | undefined>(undefined);
