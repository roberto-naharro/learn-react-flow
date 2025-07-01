import { memo } from 'react';

import DeckGL from '@deck.gl/react';
import { Map } from 'react-map-gl/maplibre';

import { mapViewerStyles } from './MapViewer.styles';
import { useEdgesContext } from '../../../flow/hooks/useEdgesContext';
import { useNodesContext } from '../../../flow/node/hooks/useNodesContext';
import { INITIAL_VIEW_STATE, MAP_STYLE_URL } from '../../constants';
import { useConnectedLayers } from '../../hooks/useConnectedLayers';
import { useDeckLayers } from '../../hooks/useDeckLayers';
import { useGeojsonCache } from '../../hooks/useGeojsonCache';

import type { MapViewerInnerProps } from '../../types';

const MapViewerInner = memo(
  ({ nodes, edges }: MapViewerInnerProps) => {
    const styles = mapViewerStyles;

    const connectedLayers = useConnectedLayers(nodes, edges);
    const geojsonCache = useGeojsonCache(connectedLayers);
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
  },
  // Custom memo comparison for performance optimization
  // Only re-render when nodes or edges array references change
  // This prevents expensive map re-renders when unrelated context state updates occur
  (prevProps, nextProps) => {
    return prevProps.nodes === nextProps.nodes && prevProps.edges === nextProps.edges;
  },
);

// Wrapper to provide nodes and edges as props
export const MapViewer = () => {
  const { nodes } = useNodesContext();
  const { edges } = useEdgesContext();
  return <MapViewerInner nodes={nodes} edges={edges} />;
};
