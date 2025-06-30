import { ReactFlowProvider } from '@xyflow/react';

import { appStyles } from './App.styles';
import LayerManagerPage from './layer-manager/pages/LayerManagerPage/LayerManagerPage';
import { EdgesProvider } from './layer-manager/providers/EdgesProvider';
import { NodesProvider } from './layer-manager/providers/NodesProvider';
import { PersistenceProvider } from './layer-manager/providers/PersistenceProvider';
import MapViewerPage from './map-viewer/pages/MapViewerPage/MapViewerPage';
import { useRouter } from './router/hooks';
import { RouterProvider } from './router/provider';

// Router component to handle page rendering based on current route
const Router = () => {
  const { currentRoute } = useRouter();

  if (currentRoute === 'layer-manager') {
    return <LayerManagerPage />;
  }

  if (currentRoute === 'map') {
    return <MapViewerPage />;
  }

  return <LayerManagerPage />;
};

function App() {
  return (
    <RouterProvider>
      <ReactFlowProvider>
        <NodesProvider>
          <EdgesProvider>
            <PersistenceProvider>
              <div style={appStyles.container}>
                <Router />
              </div>
            </PersistenceProvider>
          </EdgesProvider>
        </NodesProvider>
      </ReactFlowProvider>
    </RouterProvider>
  );
}

export default App;
