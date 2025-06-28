import LayerManagerPage from './pages/LayerManagerPage';
import { RouterProvider, useRouter } from './router';
import { createStyles } from './ui/theme';

const appStyles = createStyles(() => ({
  container: {
    width: '100vw',
    height: '100vh',
  },
}));

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
      <div style={appStyles.container}>
        <Router />
      </div>
    </RouterProvider>
  );
}

export default App;
