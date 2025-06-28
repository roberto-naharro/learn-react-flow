import { createContext } from 'react';

import type { Route } from './types';

export interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
}

export const RouterContext = createContext<RouterContextType | undefined>(undefined);
