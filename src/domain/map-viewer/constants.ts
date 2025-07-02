import type { MapViewState } from './types';

/**
 * Initial view state for the map
 */
export const INITIAL_VIEW_STATE = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
  pitch: 0,
  bearing: 0,
} as const satisfies MapViewState;

/**
 * Map style URL for the base map
 */
export const MAP_STYLE_URL = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/**
 * Default colors for map layers
 */
export const LAYER_COLORS = {
  fill: {
    // rgba(255, 140, 0, 0.5)
    base: [255, 140, 0, 50],
    bgList: [
      // rgba(255, 140, 0, 0.5)
      [255, 140, 0, 50],
      // rgba(111, 255, 0, 0.5)
      [111, 255, 0, 50],
      // rgba(0, 255, 140, 0.5)
      [0, 255, 140, 50],
      // rgba(0, 140, 255, 0.5)
      [0, 140, 255, 50],
      // rgba(140, 0, 255, 0.5)
      [140, 0, 255, 50],
      // rgba(255, 0, 140, 0.5)
      [255, 0, 140, 50],
      // rgba(255, 0, 0, 0.5)
      [255, 0, 0, 50],
      // rgba(255, 255, 255, 0.5)
      [255, 255, 255, 50],
      // rgba(255, 0, 0, 0.5)
      [255, 0, 0, 50],
    ],
  },
  stroke: [0, 0, 0, 200],
  point: [255, 140, 0, 255],
} as const;
