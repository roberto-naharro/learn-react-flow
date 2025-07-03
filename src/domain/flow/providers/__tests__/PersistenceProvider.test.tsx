import * as React from 'react';

import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { useNodesContext } from '@domain-flow/hooks/useDiagramData';
import { DiagramDataProvider } from '@domain-flow/providers/DiagramDataProvider';

import { usePersistenceContext } from '@domain-layer-manager/hooks/usePersistenceContext';
import { PersistenceProvider } from '@domain-layer-manager/providers/PersistenceProvider';

import { _reactFlowMockBuilders } from '../../../../../__mocks__/@xyflow/react';
import { localStorageMock } from '../../../../__mocks__/window/localStorageMock';

jest.unmock('@xyflow/react');

describe('PersistenceProvider', () => {
  let originalLocalStorage: Storage;
  let ReactFlowInstanceMock: ReturnType<typeof _reactFlowMockBuilders.ReactFlowInstance>;

  // Components defined within the test scope
  const TestButtons = () => {
    const { saveFlowState, restoreFlowState, resetFlowState, setReactFlowInstance } =
      usePersistenceContext();
    const { nodes, setNodes } = useNodesContext();

    // Set up mock ReactFlow instance on mount
    React.useEffect(() => {
      setReactFlowInstance(ReactFlowInstanceMock);
    }, [setReactFlowInstance]);

    return (
      <div>
        <div data-testid="node-count">{nodes.length}</div>
        <button data-testid="save-flow" onClick={saveFlowState}>
          Save Flow
        </button>
        <button data-testid="restore-flow" onClick={restoreFlowState}>
          Restore Flow
        </button>
        <button data-testid="reset-flow" onClick={resetFlowState}>
          Reset Flow
        </button>
        <button
          data-testid="add-node"
          onClick={() =>
            setNodes([
              { id: 'test' + Date.now(), position: { x: 0, y: 0 }, data: { label: 'Test' } },
            ])
          }
        >
          Add Node
        </button>
      </div>
    );
  };

  const TestComponent = () => (
    <ReactFlowProvider>
      <DiagramDataProvider>
        <PersistenceProvider>
          <TestButtons />
        </PersistenceProvider>
      </DiagramDataProvider>
    </ReactFlowProvider>
  );

  beforeAll(() => {
    // Store original values
    originalLocalStorage = window.localStorage;

    // Set up mocks
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    // Set up fake timers
    jest.useFakeTimers();
  });

  afterAll(() => {
    // Restore original values
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
    });

    // Restore real timers
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock._clearAllMocks();
    ReactFlowInstanceMock = _reactFlowMockBuilders.ReactFlowInstance({
      nodes: [{ id: 'test-node', position: { x: 100, y: 100 }, data: { label: 'Test' } }],
      edges: [{ id: 'test-edge', source: 'test-node', target: 'other-node' }],
      viewport: { x: 0, y: 0, zoom: 1 },
    });
  });

  it('should provide persistence methods', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('save-flow')).toBeInTheDocument();
    expect(screen.getByTestId('restore-flow')).toBeInTheDocument();
    expect(screen.getByTestId('reset-flow')).toBeInTheDocument();
  });

  it('should save flow state to localStorage when saving', async () => {
    render(<TestComponent />);

    // Trigger save flow
    await act(async () => {
      fireEvent.click(screen.getByTestId('save-flow'));
    });

    // Verify that toObject was called to get flow data
    expect(ReactFlowInstanceMock.toObject).toHaveBeenCalled();

    // Verify localStorage was called with the correct data
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'react-flow-diagram',
      JSON.stringify(ReactFlowInstanceMock.toObject()),
    );
  });

  it('should restore flow state from localStorage', async () => {
    // No data in ReactFlowInstanceMock
    ReactFlowInstanceMock = _reactFlowMockBuilders.ReactFlowInstance();

    // Set up test data in localStorage
    const testData = {
      nodes: [{ id: 'restored-node', position: { x: 100, y: 100 }, data: { label: 'Restored' } }],
      edges: [],
      viewport: { x: 10, y: 10, zoom: 2 },
    };

    render(<TestComponent />);

    // Initially should have 0 nodes
    expect(screen.getByTestId('node-count').textContent).toBe('0');

    localStorageMock.setItem('react-flow-diagram', JSON.stringify(testData));

    // Trigger restore flow
    await act(async () => {
      fireEvent.click(screen.getByTestId('restore-flow'));

      // Advance timers to trigger the setTimeout callback in useFlowState
      jest.advanceTimersByTime(100);
    });

    // Should have the restored node
    expect(screen.getByTestId('node-count').textContent).toBe('1');

    // Verify localStorage was read
    expect(localStorageMock.getItem).toHaveBeenCalledWith('react-flow-diagram');

    // Verify fitView was called to adjust the viewport
    expect(ReactFlowInstanceMock.fitView).toHaveBeenCalled();
  });

  it('should reset flow state', async () => {
    render(<TestComponent />);

    // Add a node first
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-node'));
    });

    // Should have 1 node
    expect(screen.getByTestId('node-count').textContent).toBe('1');

    // Trigger reset flow
    await act(async () => {
      fireEvent.click(screen.getByTestId('reset-flow'));
    });

    // Should be back to 0 nodes
    expect(screen.getByTestId('node-count').textContent).toBe('0');
  });
});
