import { useMemo } from 'react';

import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';

import { mapViewerStyles } from './MapViewer.styles';
import { INITIAL_VIEW_STATE, MAP_STYLE_URL } from '../../constants';
import { useDeckLayers } from '../../hooks/useDeckLayers';
import { useMapDataProcessor } from '../../providers/MapDataProcessor';

import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

/**
 * MapViewer component renders a map with layers using DeckGL and MapLibre.
 * It processes map data and displays tooltips on hover.
 */
export const MapViewer = () => {
  const styles = mapViewerStyles;
  const { mapData } = useMapDataProcessor();

  const connectedLayers = useMemo(() => {
    return mapData
      .filter((layer) => layer.data !== null)
      .map((layer, index) => ({
        id: layer.id,
        type: 'layer' as const,
        position: { x: 0, y: index }, // Maintain order from mapData
        data: {},
        source: `layer-${layer.id}`, // Use layer ID as source identifier
      }));
  }, [mapData]);

  // Create geojson cache from mapData
  const geojsonCache = useMemo(() => {
    const cache: Record<string, FeatureCollection<Geometry, GeoJsonProperties> | null> = {};
    mapData.forEach((layer) => {
      if (layer.data) {
        cache[`layer-${layer.id}`] = layer.data;
      }
    });
    return cache;
  }, [mapData]);

  const { deckLayers, hoverInfo } = useDeckLayers(connectedLayers, geojsonCache);

  return (
    <div style={styles.mapContainer}>
      <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={deckLayers}>
        <Map mapStyle={MAP_STYLE_URL} />
      </DeckGL>
      {hoverInfo?.object ? (
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
      ) : null}
    </div>
  );
};
