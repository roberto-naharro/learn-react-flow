import { createContext } from 'react';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export type IntersectionCache = Record<string, FeatureCollection<Geometry, GeoJsonProperties>>;

export type IntersectionContextType = {
  intersectionCache: IntersectionCache;
  computeIntersection: (
    nodeId: string,
    geojsonA: FeatureCollection<Geometry, GeoJsonProperties>,
    geojsonB: FeatureCollection<Geometry, GeoJsonProperties>,
  ) => void;
};

export const IntersectionContext = createContext<IntersectionContextType | null>(null);
