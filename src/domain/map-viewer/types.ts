import type { Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * Cache for storing fetched GeoJSON data
 */
export type GeojsonCache = Record<string, FeatureCollection<Geometry, GeoJsonProperties> | null>;

/**
 * Information about hover state on the map
 */
export type HoverInfo = {
  x: number;
  y: number;
  object: {
    properties?: GeoJsonProperties;
    [key: string]: unknown;
  };
  [key: string]: unknown;
} | null;

/**
 * Layer node with its connected source
 */
export type LayerWithSource = Node & {
  /**
   * Source URL or identifier for the layer
   */
  source: string;
};

/**
 * Configuration for map view state
 */
export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}
