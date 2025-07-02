import { useEffect } from 'react';

import { Panel } from '@xyflow/react';

import { mapViewerPageStyles } from './MapViewerPage.styles';
import { useRouter } from '../../../../router/hooks';
import { useEdgesContext, useNodesContext } from '../../../flow/hooks/useDiagramData';
import { MapViewer } from '../../components/MapViewer/MapViewer';
import { useMapDataProcessor } from '../../providers/MapDataProcessor';

const MapViewerPageInner = () => {
  const { navigate } = useRouter();
  const { nodes } = useNodesContext();
  const { edges } = useEdgesContext();
  const { mapState, startProcessing, isProcessingComplete } = useMapDataProcessor();

  const styles = mapViewerPageStyles;

  useEffect(() => {
    startProcessing(nodes, edges);
    // This effect runs once when the component mounts to start processing map data
    // It does not depend on any edge or node changes, only on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startProcessing]);

  // Calculate processing status for E2E testing
  const getProcessingStatus = () => {
    const allStates = Object.values(mapState);
    const loadingCount = allStates.filter((state) => state === 'loading').length;
    const computingCount = allStates.filter((state) => state === 'computing').length;
    const readyCount = allStates.filter((state) => state === 'ready').length;
    const errorCount = allStates.filter((state) => state === 'error').length;

    if (allStates.length === 0) return 'No layers to process';
    if (isProcessingComplete) {
      let status = `Ready: ${readyCount} nodes`;
      if (errorCount > 0) {
        status += `, ${errorCount} errors`;
      }
      return status;
    }
    let processingStatus = `Processing: ${loadingCount} loading, ${computingCount} computing, ${readyCount} ready`;
    if (errorCount > 0) {
      processingStatus += `, ${errorCount} errors`;
    }
    return processingStatus;
  };

  return (
    <>
      <Panel position="top-right">
        <div style={styles.container}>
          <button style={styles.button} onClick={() => navigate('layer-manager')}>
            Show Diagram
          </button>
          <div
            style={{
              fontSize: '12px',
              color: isProcessingComplete ? '#28a745' : '#6c757d',
              marginTop: '4px',
              textAlign: 'center',
            }}
            data-testid="map-processing-status"
          >
            {getProcessingStatus()}
          </div>
        </div>
      </Panel>
      <MapViewer />
    </>
  );
};

const MapViewerPage = () => {
  return <MapViewerPageInner />;
};

export default MapViewerPage;
