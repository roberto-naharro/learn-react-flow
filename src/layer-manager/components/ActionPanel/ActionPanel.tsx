import { Panel } from '@xyflow/react';

import { usePersistenceContext } from '../../hooks/usePersistenceContext';

export const ActionPanel = () => {
  const { saveFlowState, restoreFlowState, resetFlowState } = usePersistenceContext();

  return (
    <Panel position="top-right">
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={saveFlowState}>Save</button>
        <button onClick={restoreFlowState}>Restore</button>
        <button onClick={resetFlowState}>Reset</button>
      </div>
    </Panel>
  );
};
