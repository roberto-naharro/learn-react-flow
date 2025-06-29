import { ReactFlowProvider } from '@xyflow/react';

import { appStyles } from './App.styles';
import LayerManagerPage from './layer-manager/pages/LayerManagerPage/LayerManagerPage';
import { useRouter } from './router/hooks';
import { RouterProvider } from './router/provider';

// Router component to handle page rendering based on current route
const Router = () => {
  const { currentRoute } = useRouter();

  if (currentRoute === 'layer-manager') {
    return <LayerManagerPage />;
  }

  return <LayerManagerPage />;
};

function App() {
  return (
    <RouterProvider>
      <ReactFlowProvider>
        <div style={appStyles.container}>
          <Router />
        </div>
      </ReactFlowProvider>
    </RouterProvider>
  );
}

export default App;
