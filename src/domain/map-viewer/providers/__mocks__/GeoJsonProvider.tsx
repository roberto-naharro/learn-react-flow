import React from 'react';

import { jest } from '@jest/globals';

import { GeoJsonContext } from '../../context/GeoJsonContext';

// Mock that provides an empty cache and a no-op fetch function
export const GeoJsonProvider = ({ children }: { children: React.ReactNode }) => {
  const mockContextValue = React.useMemo(
    () => ({
      geojsonCache: {},
      fetchGeoJson: jest.fn(),
    }),
    [],
  );

  return <GeoJsonContext.Provider value={mockContextValue}>{children}</GeoJsonContext.Provider>;
};
