import { GeoJsonLayer } from '@deck.gl/layers';

import { NODE_SOURCE_TYPE_NAME } from '../../flow/node/components/SourceCustomNode';
import { LAYER_COLORS } from '../constants';

import type { SourceCustomNodeProps } from '../../flow/node/components/SourceCustomNode/canvas/SourceCustomNode';
import type { ConnectedLayer, HoverInfo } from '../types';
import type { PickingInfo } from '@deck.gl/core';
import type { Edge, Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * Finds the source URL connected to a layer node
 */
export function getConnectedSourceUrl(
  layerNodeId: string,
  edges: Edge[],
  nodes: Node[],
): string | null {
  // Find incoming edge to this layer node
  const edge = edges.find((e) => e.target === layerNodeId);
  if (!edge) return null;

  const sourceNode = nodes.find(
    (n) => n.id === edge.source && n.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;

  return sourceNode?.data?.url ?? null;
}

/**
 * Creates a Deck.gl GeoJsonLayer with proper configuration for all geometry types
 */
export function createGeoJsonLayer(
  layerNode: ConnectedLayer,
  layerIndex: number,
  geojsonData: FeatureCollection<Geometry, GeoJsonProperties>,
  onHover: (info: PickingInfo) => void,
): GeoJsonLayer {
  return new GeoJsonLayer({
    id: `geojson-layer-${layerNode.id}`,
    data: geojsonData,
    pickable: true,
    // Polygon and LineString properties
    stroked: true,
    filled: true,
    lineWidthScale: 2,
    lineWidthMinPixels: 1,
    // Configure layer fill color with dynamic transparency based on layer index
    // Each subsequent layer gets slightly more opaque to show stacking order
    getFillColor: [
      ...LAYER_COLORS.fill.base, // RGB base color
      LAYER_COLORS.fill.alphaBase + layerIndex * LAYER_COLORS.fill.alphaIncrement, // Dynamic alpha
    ],
    getLineColor: [...LAYER_COLORS.stroke],
    getLineWidth: 2,
    // Point rendering configuration for optimal visibility across zoom levels
    pointType: 'circle',
    getPointRadius: 5,
    pointRadiusMinPixels: 3, // Minimum size when zoomed out
    pointRadiusMaxPixels: 20, // Maximum size when zoomed in
    pointRadiusUnits: 'pixels',
    pointAntialiasing: true,
    pointBillboard: true, // Points always face the camera
    getPointColor: [...LAYER_COLORS.point],
    onHover,
  });
}

/**
 * Creates hover handler for Deck.gl layers
 */
export function createHoverHandler(setHoverInfo: (info: HoverInfo) => void) {
  return (info: PickingInfo) => {
    if (info?.object) {
      setHoverInfo({
        x: info.x,
        y: info.y,
        object: info.object,
      });
    } else {
      setHoverInfo(null);
    }
  };
}

// Removed: fetchGeoJsonData and updateGeojsonCache functions
// These are now handled by the GeoJsonProvider and Web Worker
