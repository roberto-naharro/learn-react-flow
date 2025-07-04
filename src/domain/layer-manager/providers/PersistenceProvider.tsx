import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';

import { useReactFlow } from '@xyflow/react';

import { useEdgesContext, useNodesContext } from '@domain-flow/hooks/useDiagramData';

import { PersistenceContext } from '@domain-layer-manager/context/PersistenceContext';
import { usePersistence } from '@domain-layer-manager/hooks/usePersistence';

export const PersistenceProvider = ({ children }: { children: ReactNode }) => {
  const { setNodes } = useNodesContext();
  const { setEdges } = useEdgesContext();
  const { setViewport } = useReactFlow();
  const initialized = useRef(false);

  const {
    saveFlowState,
    restoreFlowState,
    resetFlowState,
    getStoredFlowData,
    setReactFlowInstance,
  } = usePersistence();

  // Handle the actual data loading and updating
  const handleRestoreFlowState = useCallback(() => {
    const flowData = restoreFlowState();
    if (flowData) {
      const { nodes, edges, viewport } = flowData;
      if (nodes) setNodes(nodes);
      if (edges) setEdges(edges);
      if (viewport) setViewport(viewport);
    }
  }, [restoreFlowState, setNodes, setEdges, setViewport]);

  // Handle the actual data resetting
  const handleResetFlowState = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setViewport({ x: 0, y: 0, zoom: 1 });
    resetFlowState();
  }, [resetFlowState, setNodes, setEdges, setViewport]);

  // Initial load from storage on mount only
  // Using ref to prevent re-initialization during re-renders or strict mode double effects
  useEffect(() => {
    if (!initialized.current) {
      const flowData = getStoredFlowData();
      if (flowData) {
        const { nodes, edges, viewport } = flowData;
        if (nodes) setNodes(nodes);
        if (edges) setEdges(edges);
        if (viewport) setViewport(viewport);
      }
      initialized.current = true;
    }
  }, [getStoredFlowData, setNodes, setEdges, setViewport]);

  const value = useMemo(
    () => ({
      saveFlowState,
      restoreFlowState: handleRestoreFlowState,
      resetFlowState: handleResetFlowState,
      setReactFlowInstance,
    }),
    [saveFlowState, handleRestoreFlowState, handleResetFlowState, setReactFlowInstance],
  );

  return <PersistenceContext.Provider value={value}>{children}</PersistenceContext.Provider>;
};
