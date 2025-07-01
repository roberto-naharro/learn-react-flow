import { useContext } from 'react';

import { GeoJsonContext, type GeoJsonContextType } from '../context/GeoJsonContext';

export const useGeoJsonContext = (): GeoJsonContextType => {
  const context = useContext(GeoJsonContext);
  if (!context) {
    throw new Error('useGeoJsonContext must be used within a GeoJsonProvider');
  }
  return context;
};
