import { jest } from '@jest/globals';

import type { DiagramDataContextType } from '../DiagramDataContext';

// Exportable mock functions for testing assertions
export const mockSetNodes = jest.fn();
export const mockOnNodesChange = jest.fn();
export const mockAddNode = jest.fn();
export const mockRemoveNode = jest.fn();
export const mockUpdateNodeData = jest.fn();
export const mockSetEdges = jest.fn();
export const mockOnEdgesChange = jest.fn();
export const mockOnConnect = jest.fn();

/**
 * Builds a mock DiagramDataContext value for testing purposes
 * @param overrides - Optional overrides for specific methods/values
 * @returns Mock DiagramDataContextType instance
 */
export function buildDiagramDataContextMock(
  overrides?: Partial<DiagramDataContextType>,
): DiagramDataContextType {
  return {
    // Node state and operations
    nodes: [],
    setNodes: mockSetNodes,
    onNodesChange: mockOnNodesChange,
    addNode: mockAddNode,
    removeNode: mockRemoveNode,
    updateNodeData: mockUpdateNodeData,
    // Edge state and operations
    edges: [],
    setEdges: mockSetEdges,
    onEdgesChange: mockOnEdgesChange,
    onConnect: mockOnConnect,
    ...overrides,
  };
}
