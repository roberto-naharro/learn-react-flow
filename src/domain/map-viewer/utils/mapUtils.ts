import { GeoJsonLayer } from '@deck.gl/layers';

import { NODE_INTERSECTION_TYPE_NAME } from '@domain-flow/node/components/IntersectionCustomNode';
import { NODE_SOURCE_TYPE_NAME } from '@domain-flow/node/components/SourceCustomNode';
import type { SourceCustomNodeProps } from '@domain-flow/node/components/SourceCustomNode/canvas/SourceCustomNode';

import { LAYER_COLORS } from '@domain-map-viewer/constants';
import type { HoverInfo, LayerWithSource } from '@domain-map-viewer/types';

import type { PickingInfo } from '@deck.gl/core';
import type { Edge, Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * Finds the source URL connected to a layer node or returns intersection node ID
 */
export function getConnectedSourceUrl(
  layerNodeId: string,
  edges: Edge[],
  nodes: Node[],
): string | null {
  // Find incoming edge to this layer node
  const edge = edges.find((currentEdge) => currentEdge.target === layerNodeId);
  if (!edge) return null;

  const sourceNode = nodes.find((node) => node.id === edge.source);

  if (sourceNode?.type === NODE_SOURCE_TYPE_NAME) {
    return (sourceNode as SourceCustomNodeProps)?.data?.url ?? null;
  } else if (sourceNode?.type === NODE_INTERSECTION_TYPE_NAME) {
    // For intersection nodes, return the node ID as identifier
    return `intersection:${sourceNode.id}`;
  }

  return null;
}

/**
 * Creates a Deck.gl GeoJsonLayer with proper configuration for all geometry types
 */
export function createGeoJsonLayer(
  layerNode: LayerWithSource,
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
    getFillColor: [...LAYER_COLORS.fill.bgList[layerIndex % LAYER_COLORS.fill.bgList.length]],
    getLineColor: [...LAYER_COLORS.stroke],
    getLineWidth: 2,
    pointType: 'circle',
    getPointRadius: 5,
    pointRadiusMinPixels: 3,
    pointRadiusMaxPixels: 20,
    pointRadiusUnits: 'pixels',
    pointAntialiasing: true,
    pointBillboard: true,
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
