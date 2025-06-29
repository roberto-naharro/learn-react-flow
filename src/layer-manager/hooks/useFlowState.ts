import { useCallback, useState } from 'react';

import type { ReactFlowInstance } from '@xyflow/react';

const STORAGE_KEY = 'react-flow-diagram';

export const useFlowState = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  // Save the current flow state to localStorage
  const saveFlowState = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
      return true;
    }
    console.warn('Cannot save flow state: reactFlowInstance not available');
    return false;
  }, [reactFlowInstance]);

  // Get flow data from localStorage
  const getStoredFlowData = useCallback(() => {
    try {
      const flowString = localStorage.getItem(STORAGE_KEY);
      if (flowString) {
        return JSON.parse(flowString);
      }
    } catch (error) {
      console.error('Failed to parse flow state:', error);
    }
    return null;
  }, []);

  // Reset function that can be called by the provider
  const resetFlowState = useCallback(() => {
    // This should now be implemented in the provider using this hook
    // The provider will have access to the necessary setters
    if (reactFlowInstance) {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2 });
      });
    }
    return true;
  }, [reactFlowInstance]);

  // Load and restore flow from localStorage
  const restoreFlowState = useCallback(() => {
    // The actual restoration should happen in the provider
    // using the data returned by getStoredFlowData
    if (reactFlowInstance) {
      setTimeout(() => {
        reactFlowInstance.fitView({ padding: 0.2 });
      }, 100);
    }
    return getStoredFlowData();
  }, [getStoredFlowData, reactFlowInstance]);

  return {
    saveFlowState,
    restoreFlowState,
    resetFlowState,
    getStoredFlowData,
    setReactFlowInstance,
  };
};
