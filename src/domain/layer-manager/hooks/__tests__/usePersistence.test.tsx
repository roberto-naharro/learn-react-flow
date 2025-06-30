import * as React from 'react';

import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { ReactFlowInstanceMockFactory } from '../../../../__mocks__/ReactFlow/ReactFlowInstanceMock';
import { requestAnimationFrameMock } from '../../../../__mocks__/requestAnimationFrameMock';
import { localStorageMock } from '../../../../__mocks__/window/localStorageMock';
import { usePersistence } from '../usePersistence';

describe('usePersistence hook', () => {
  let originalLocalStorage: Storage;
  let originalRequestAnimationFrame: typeof global.requestAnimationFrame;
  let ReactFlowInstanceMock: ReturnType<typeof ReactFlowInstanceMockFactory>;

  beforeAll(() => {
    // Store original values
    originalLocalStorage = window.localStorage;
    originalRequestAnimationFrame = global.requestAnimationFrame;

    // Set up mocks
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    global.requestAnimationFrame = requestAnimationFrameMock;

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterAll(() => {
    // Restore original values
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });

    global.requestAnimationFrame = originalRequestAnimationFrame;

    // Restore real timers
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock._clearAllMocks();
    ReactFlowInstanceMock = ReactFlowInstanceMockFactory();
  });

  it('should initialize with empty state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ReactFlowProvider>{children}</ReactFlowProvider>
    );

    const { result } = renderHook(() => usePersistence(), { wrapper });

    expect(result.current.saveFlowState).toBeDefined();
    expect(result.current.restoreFlowState).toBeDefined();
    expect(result.current.resetFlowState).toBeDefined();
    expect(result.current.getStoredFlowData).toBeDefined();
  });

  it('should save flow state to localStorage', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ReactFlowProvider>{children}</ReactFlowProvider>
    );

    const { result } = renderHook(() => usePersistence(), { wrapper });

    // Set ReactFlow instance
    act(() => {
      result.current.setReactFlowInstance(ReactFlowInstanceMock as any);
    });

    // Save flow state
    let saveResult;
    act(() => {
      saveResult = result.current.saveFlowState();
    });

    expect(saveResult).toBe(true);
    expect(ReactFlowInstanceMock.toObject).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'react-flow-diagram',
      JSON.stringify(ReactFlowInstanceMock.toObject()),
    );
  });

  it('should restore flow state from localStorage', () => {
    // Setup stored data
    const mockFlow = {
      nodes: [{ id: 'test', data: { label: 'Test' }, position: { x: 0, y: 0 } }],
      edges: [{ id: 'e1', source: 'test', target: 'test2' }],
      viewport: { x: 10, y: 20, zoom: 1.5 },
    };

    localStorageMock.setItem('react-flow-diagram', JSON.stringify(mockFlow));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ReactFlowProvider>{children}</ReactFlowProvider>
    );

    const { result } = renderHook(() => usePersistence(), { wrapper });

    // Set ReactFlow instance
    act(() => {
      result.current.setReactFlowInstance(ReactFlowInstanceMock as any);
    });

    // Restore flow state
    let restoredData;
    act(() => {
      restoredData = result.current.restoreFlowState();
    });

    expect(restoredData).toEqual(mockFlow);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('react-flow-diagram');

    // Don't check setTimeout directly, just advance timers and check the effect
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(ReactFlowInstanceMock.fitView).toHaveBeenCalled();
  });
});
