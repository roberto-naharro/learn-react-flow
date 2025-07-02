import { useCallback, useState } from 'react';

import type { ReactFlowInstance } from '@xyflow/react';

const STORAGE_KEY = 'react-flow-diagram';

export const usePersistence = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  /**
   * Serializes current flow state to localStorage for persistence.
   */
  const saveFlowState = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
      return true;
    }
    console.warn('Cannot save flow state: reactFlowInstance not available');
    return false;
  }, [reactFlowInstance]);

  /**
   * Retrieves and parses flow diagram state from localStorage with error handling.
   */
  const getStoredFlowData = useCallback(() => {
    try {
      const flowString = localStorage.getItem(STORAGE_KEY);
      if (flowString) {
        return JSON.parse(flowString);
      }
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failed to parse flow state from localStorage: ${error.message}`;
        console.error(error);
      } else {
        console.error('Failed to parse flow state from localStorage');
      }
    }
    return null;
  }, []);

  const resetFlowState = useCallback(() => {
    if (reactFlowInstance) {
      requestAnimationFrame(() => {
        reactFlowInstance.fitView({ padding: 0.2 });
      });
    }
    return true;
  }, [reactFlowInstance]);

  const restoreFlowState = useCallback(() => {
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
