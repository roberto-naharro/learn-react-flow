import { useMemo, useState } from 'react';

import { createGeoJsonLayer, createHoverHandler } from '../utils/mapUtils';

import type { ConnectedLayer, GeojsonCache, HoverInfo } from '../types';

/**
 * Hook to manage Deck.gl layers and hover state
 */
export function useDeckLayers(connectedLayers: ConnectedLayer[], geojsonCache: GeojsonCache) {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);

  const deckLayers = useMemo(() => {
    const handleHover = createHoverHandler(setHoverInfo);

    return connectedLayers
      .map((layerNode, i) => {
        const data = geojsonCache[layerNode.sourceUrl];
        if (!data) return null;

        return createGeoJsonLayer(layerNode, i, data, handleHover);
      })
      .filter(Boolean);
  }, [connectedLayers, geojsonCache]);

  return { deckLayers, hoverInfo };
}
