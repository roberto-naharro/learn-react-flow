import { useMemo, useState } from 'react';

import { createGeoJsonLayer, createHoverHandler } from '../utils/mapUtils';

import type { GeojsonCache, HoverInfo, LayerWithSource } from '../types';

/**
 * Hook to manage Deck.gl layers and hover state
 */
export function useDeckLayers(connectedLayers: LayerWithSource[], geojsonCache: GeojsonCache) {
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);

  const deckLayers = useMemo(() => {
    const handleHover = createHoverHandler(setHoverInfo);

    return connectedLayers
      .map((layerNode, i) => {
        const data = geojsonCache[layerNode.source];
        if (!data) return null;

        return createGeoJsonLayer(layerNode, i, data, handleHover);
      })
      .filter(Boolean);
  }, [connectedLayers, geojsonCache]);

  return { deckLayers, hoverInfo };
}
