import { useEffect, useRef } from 'react';

import { FlowCanvas } from '../../components/FlowCanvas/FlowCanvas';
import { useMapDataSync } from '../../hooks/useMapDataSync';
import { DragAndDropProvider } from '../../providers/DragAndDropProvider';
import { PersistenceProvider } from '../../providers/PersistenceProvider';

const LayerManagerPageInner = () => {
  const { syncMapDataToNodes } = useMapDataSync();
  const hasLoadedRef = useRef(false);

  // Sync map data when returning to diagram view
  useEffect(() => {
    // Always sync when component mounts (navigation to diagram view)
    syncMapDataToNodes();
    hasLoadedRef.current = true;
    // load only once when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DragAndDropProvider>
      <FlowCanvas />
    </DragAndDropProvider>
  );
};

const LayerManagerPage = () => {
  return (
    <PersistenceProvider>
      <LayerManagerPageInner />
    </PersistenceProvider>
  );
};

export default LayerManagerPage;
