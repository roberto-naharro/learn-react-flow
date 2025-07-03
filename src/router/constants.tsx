import LayerManagerPage from '@domain-layer-manager/pages/LayerManagerPage/LayerManagerPage';

import MapViewerPage from '@domain-map-viewer/pages/MapViewerPage/MapViewerPage';

export const ROUTES = {
  'layer-manager': <LayerManagerPage />,
  map: <MapViewerPage />,
};

export const DEFAULT_ROUTE = 'layer-manager' as const satisfies keyof typeof ROUTES;
