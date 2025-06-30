import { Panel } from '@xyflow/react';

import { mapViewerPageStyles } from './MapViewerPage.styles';
import { useRouter } from '../../../../router/hooks';
import { MapViewer } from '../../components/MapViewer/MapViewer';

const MapViewerPage = () => {
  const { navigate } = useRouter();

  const styles = mapViewerPageStyles;

  return (
    <>
      <Panel position="top-right">
        <div style={styles.container}>
          <button style={styles.button} onClick={() => navigate('layer-manager')}>
            Show Diagram
          </button>
        </div>
      </Panel>
      <MapViewer />;
    </>
  );
};

export default MapViewerPage;
