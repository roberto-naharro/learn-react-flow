import { ReactFlowProvider } from '@xyflow/react';

import { appStyles } from './App.styles';
import { DiagramDataProvider } from './domain/flow/providers/DiagramDataProvider';
import { MapDataProcessorProvider } from './domain/map-viewer/providers/MapDataProcessor';
import Router from './router/component';
import { RouterProvider } from './router/provider';

// Router component to handle page rendering based on current route

function App() {
  return (
    <RouterProvider>
      <ReactFlowProvider>
        <DiagramDataProvider>
          <MapDataProcessorProvider>
            <div style={appStyles.container}>
              <Router />
            </div>
          </MapDataProcessorProvider>
        </DiagramDataProvider>
      </ReactFlowProvider>
    </RouterProvider>
  );
}

export default App;
