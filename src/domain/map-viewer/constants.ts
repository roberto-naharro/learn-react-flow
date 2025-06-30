import type { MapViewState } from './types';

/**
 * Initial view state for the map
 */
export const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

/**
 * Map style URL for the base map
 */
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/**
 * Default colors for map layers
 */
export const LAYER_COLORS = {
  fill: {
    base: [255, 140, 0],
    alphaBase: 100,
    alphaIncrement: 50,
  },
  stroke: [0, 0, 0, 200],
  point: [255, 140, 0, 255],
} as const;
