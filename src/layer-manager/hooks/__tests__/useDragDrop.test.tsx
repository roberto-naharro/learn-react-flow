import * as React from 'react';

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { reactFlowMock } from '../../../__mocks__/ReactFlow/ReactFlowInstanceMock';
import { DragAndDropContext, type DragAndDropContextType } from '../../context/DragAndDropContext';
import { NodesContext } from '../../context/NodesContext';
import { useDragDrop } from '../useDragDrop';

// Mock ReactFlow hook
jest.mock('@xyflow/react', () => ({
  useReactFlow: reactFlowMock.useReactFlow,
}));

describe('useDragDrop', () => {
  const mockAddNode = jest.fn();

  // Create wrapper with required contexts
  const wrapper = ({ children }: { children: React.ReactNode }) => {
    const dragAndDropValue = ['test-node-type', jest.fn()] as const;
    const nodesValue = {
      nodes: [],
      setNodes: jest.fn(),
      onNodesChange: jest.fn(),
      addNode: mockAddNode,
      removeNode: jest.fn(),
    };

    return (
      <DragAndDropContext.Provider value={dragAndDropValue}>
        <NodesContext.Provider value={nodesValue}>{children}</NodesContext.Provider>
      </DragAndDropContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide onDragOver and onDrop functions', () => {
    const { result } = renderHook(() => useDragDrop(), { wrapper });

    expect(result.current.onDragOver).toBeDefined();
    expect(typeof result.current.onDragOver).toBe('function');
    expect(result.current.onDrop).toBeDefined();
    expect(typeof result.current.onDrop).toBe('function');
  });

  it('should handle onDragOver correctly', () => {
    const { result } = renderHook(() => useDragDrop(), { wrapper });

    const mockEvent = {
      preventDefault: jest.fn(),
      dataTransfer: { dropEffect: '' },
    } as unknown as React.DragEvent<HTMLDivElement>;

    result.current.onDragOver(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.dataTransfer.dropEffect).toBe('move');
  });

  it('should handle onDrop with node type from context', () => {
    const { result } = renderHook(() => useDragDrop(), { wrapper });

    const mockEvent = {
      preventDefault: jest.fn(),
      clientX: 100,
      clientY: 200,
      dataTransfer: {
        getData: jest.fn(),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    result.current.onDrop(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockAddNode).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'test-node-type',
        position: { x: 100, y: 200 },
        data: { label: 'test-node-type node' },
      }),
    );
  });

  it('should handle onDrop with node type from dataTransfer', () => {
    // Create wrapper with empty drag context value
    const customWrapper = ({ children }: { children: React.ReactNode }) => {
      const dragAndDropValue = [null, jest.fn()] as DragAndDropContextType;
      const nodesValue = {
        nodes: [],
        setNodes: jest.fn(),
        onNodesChange: jest.fn(),
        addNode: mockAddNode,
        removeNode: jest.fn(),
      };

      return (
        <DragAndDropContext.Provider value={dragAndDropValue}>
          <NodesContext.Provider value={nodesValue}>{children}</NodesContext.Provider>
        </DragAndDropContext.Provider>
      );
    };

    const { result } = renderHook(() => useDragDrop(), { wrapper: customWrapper });

    const mockEvent = {
      preventDefault: jest.fn(),
      clientX: 100,
      clientY: 200,
      dataTransfer: {
        getData: jest.fn((format) => (format === 'application/reactflow' ? 'custom-node' : null)),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    result.current.onDrop(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockAddNode).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'custom-node',
        position: { x: 100, y: 200 },
        data: { label: 'custom-node node' },
      }),
    );
  });

  it('should not add node if no node type is available', () => {
    // Create wrapper with empty drag context value
    const customWrapper = ({ children }: { children: React.ReactNode }) => {
      const dragAndDropValue = [null, jest.fn()] as const;
      const nodesValue = {
        nodes: [],
        setNodes: jest.fn(),
        onNodesChange: jest.fn(),
        addNode: mockAddNode,
        removeNode: jest.fn(),
      };

      return (
        <DragAndDropContext.Provider value={dragAndDropValue}>
          <NodesContext.Provider value={nodesValue}>{children}</NodesContext.Provider>
        </DragAndDropContext.Provider>
      );
    };

    const { result } = renderHook(() => useDragDrop(), { wrapper: customWrapper });

    const mockEvent = {
      preventDefault: jest.fn(),
      clientX: 100,
      clientY: 200,
      dataTransfer: {
        getData: jest.fn(() => null),
      },
    } as unknown as React.DragEvent<HTMLDivElement>;

    result.current.onDrop(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockAddNode).not.toHaveBeenCalled();
  });
});
