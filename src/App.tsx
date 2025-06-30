import { ReactFlowProvider } from '@xyflow/react';

import { appStyles } from './App.styles';
import { EdgesProvider } from './domain/flow/providers/EdgesProvider';
import { NodesProvider } from './domain/flow/providers/NodesProvider';
import { PersistenceProvider } from './domain/layer-manager/providers/PersistenceProvider';
import Router from './router/component';
import { RouterProvider } from './router/provider';

// Router component to handle page rendering based on current route

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
