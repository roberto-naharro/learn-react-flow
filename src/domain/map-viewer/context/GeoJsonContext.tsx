import { createContext } from 'react';

import type { GeojsonCache } from '../types';

export type GeoJsonContextType = {
  geojsonCache: GeojsonCache;
  fetchGeoJson: (url: string) => void;
};

export const GeoJsonContext = createContext<GeoJsonContextType | null>(null);
