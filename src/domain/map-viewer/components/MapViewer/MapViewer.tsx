import { memo, useEffect, useMemo, useState } from 'react';

import { GeoJsonLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';

import { mapViewerStyles } from './MapViewer.styles';
import { useEdgesContext } from '../../../flow/hooks/useEdgesContext';
import { NODE_LAYER_TYPE_NAME } from '../../../flow/node/components/LayerCustomNode';
import { NODE_SOURCE_TYPE_NAME } from '../../../flow/node/components/SourceCustomNode';
import { useNodesContext } from '../../../flow/node/hooks/useNodesContext';

import type { SourceCustomNodeProps } from '../../../flow/node/components/SourceCustomNode/canvas/SourceCustomNode';
import type { PickingInfo } from '@deck.gl/core';
import type { Edge, Node } from '@xyflow/react';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

const INITIAL_VIEW_STATE = {
  longitude: -100,
  latitude: 40,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

type GeojsonCache = Record<string, FeatureCollection<Geometry, GeoJsonProperties> | null>;

type HoverInfo = {
  x: number;
  y: number;
  object: {
    properties?: GeoJsonProperties;
    [key: string]: unknown;
  };
  [key: string]: unknown;
} | null;

function getConnectedSourceUrl(layerNodeId: string, edges: Edge[], nodes: Node[]): string | null {
  // Find incoming edge to this layer node
  const edge = edges.find((e) => e.target === layerNodeId);
  if (!edge) return null;
  const sourceNode = nodes.find(
    (n) => n.id === edge.source && n.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;
  return sourceNode?.data?.url ?? null;
}

// Memoized inner component
const MapViewerInner = memo(
  ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
    const styles = mapViewerStyles;
    const [geojsonCache, setGeojsonCache] = useState<GeojsonCache>({});
    const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);

    // Find all layer nodes that are connected to a source node
    const connectedLayers = useMemo(() => {
      return nodes
        .filter((n) => n.type === NODE_LAYER_TYPE_NAME)
        .map((layerNode) => {
          const url = getConnectedSourceUrl(layerNode.id, edges, nodes);
          return url ? { ...layerNode, sourceUrl: url } : null;
        })
        .filter((layerNode) => layerNode !== null)
        .sort((a, b) => b.position.y - a.position.y);
    }, [nodes, edges]);

    // Fetch GeoJSON for each unique URL
    useEffect(() => {
      const urls = Array.from(new Set(connectedLayers.map((l) => l.sourceUrl)));
      urls.forEach((url) => {
        if (!geojsonCache[url]) {
          fetch(url)
            .then((res) => res.json())
            .then((data: FeatureCollection<Geometry, GeoJsonProperties>) =>
              setGeojsonCache((cache) => ({ ...cache, [url]: data })),
            )
            .catch(() => setGeojsonCache((cache) => ({ ...cache, [url]: null })));
        }
      });
    }, [connectedLayers, geojsonCache]);

    // Build Deck.gl layers
    const deckLayers = useMemo(() => {
      // Wrap setHoverInfo to match Deck.gl's onHover signature
      const handleHover = (info: PickingInfo) => {
        if (info && info.object) {
          setHoverInfo({
            x: info.x,
            y: info.y,
            object: info.object,
            // spread any other properties you want to keep
          });
        } else {
          setHoverInfo(null);
        }
      };

      return connectedLayers
        .map((layerNode, i) => {
          const data = geojsonCache[layerNode.sourceUrl];
          if (!data) return null;
          return new GeoJsonLayer({
            id: `geojson-layer-${layerNode.id}`,
            data,
            pickable: true,
            // Polygon and LineString properties
            stroked: true,
            filled: true,
            lineWidthScale: 2,
            lineWidthMinPixels: 1,
            getFillColor: [255, 140, 0, 100 + i * 50],
            getLineColor: [0, 0, 0, 200],
            getLineWidth: 2,
            // Point properties - these were missing!
            pointType: 'circle',
            getPointRadius: 5,
            pointRadiusMinPixels: 3,
            pointRadiusMaxPixels: 20,
            pointRadiusUnits: 'pixels',
            pointAntialiasing: true,
            pointBillboard: true,
            // Point color - use the same color scheme as fill but with full opacity
            getPointColor: [255, 140, 0, 255],
            onHover: handleHover,
          });
        })
        .filter(Boolean);
    }, [connectedLayers, geojsonCache]);

    return (
      <div style={styles.mapContainer}>
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={deckLayers}>
          <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
        </DeckGL>
        {hoverInfo && hoverInfo.object && (
          <div
            style={{
              ...styles.tooltip,
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}
          >
            <pre style={styles.tooltipContent}>
              {JSON.stringify(hoverInfo.object.properties, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Shallow compare nodes and edges arrays by reference
    return prevProps.nodes === nextProps.nodes && prevProps.edges === nextProps.edges;
  },
);

// Wrapper to provide nodes and edges as props
export const MapViewer = () => {
  const { nodes } = useNodesContext();
  const { edges } = useEdgesContext();
  return <MapViewerInner nodes={nodes as Node[]} edges={edges as Edge[]} />;
};
