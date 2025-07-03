import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { useDiagramData } from '@domain-flow/hooks/useDiagramData';
import { DiagramDataProvider } from '@domain-flow/providers/DiagramDataProvider';

jest.unmock('@xyflow/react');

describe('DiagramDataProvider', () => {
  // Inner component that uses the unified diagram data context
  const DiagramControls = () => {
    const { nodes, edges, addNode, removeNode, onConnect } = useDiagramData();

    return (
      <div>
        <div data-testid="node-count">{nodes.length}</div>
        <div data-testid="edge-count">{edges.length}</div>
        <button
          data-testid="add-node"
          onClick={() =>
            addNode({
              id: `test-node-${nodes.length}`,
              data: { label: 'Test Node' },
              position: { x: 100, y: 100 },
            })
          }
        >
          Add Node
        </button>
        <button
          data-testid="remove-node"
          onClick={() => nodes.length > 0 && removeNode(nodes[0].id)}
        >
          Remove Node
        </button>
        <button
          data-testid="add-edge"
          onClick={() => {
            if (nodes.length >= 2) {
              onConnect({
                source: nodes[0].id,
                target: nodes[1].id,
                sourceHandle: null,
                targetHandle: null,
              });
            }
          }}
        >
          Add Edge
        </button>
      </div>
    );
  };

  // Wrapper component that provides unified context
  const TestComponent = () => {
    return (
      <ReactFlowProvider>
        <DiagramDataProvider>
          <DiagramControls />
        </DiagramDataProvider>
      </ReactFlowProvider>
    );
  };

  it('should provide unified nodes and edges state and operations', () => {
    render(<TestComponent />);

    // Initially no nodes or edges
    expect(screen.getByTestId('node-count').textContent).toBe('0');
    expect(screen.getByTestId('edge-count').textContent).toBe('0');

    // Add nodes
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('2');

    // Add edge between nodes
    fireEvent.click(screen.getByTestId('add-edge'));
    expect(screen.getByTestId('edge-count').textContent).toBe('1');

    // Remove a node
    fireEvent.click(screen.getByTestId('remove-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('1');
  });

  it('should handle multiple nodes and edges', () => {
    render(<TestComponent />);

    // Add multiple nodes
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));

    expect(screen.getByTestId('node-count').textContent).toBe('3');

    // Add edges
    fireEvent.click(screen.getByTestId('add-edge'));
    expect(screen.getByTestId('edge-count').textContent).toBe('1');

    // Remove nodes
    fireEvent.click(screen.getByTestId('remove-node'));
    fireEvent.click(screen.getByTestId('remove-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('1');
  });

  it('should maintain independent state for nodes and edges', () => {
    render(<TestComponent />);

    // Add nodes without edges
    fireEvent.click(screen.getByTestId('add-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('1');
    expect(screen.getByTestId('edge-count').textContent).toBe('0');

    // Add more nodes
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('3');

    // Add edge
    fireEvent.click(screen.getByTestId('add-edge'));
    expect(screen.getByTestId('edge-count').textContent).toBe('1');
    expect(screen.getByTestId('node-count').textContent).toBe('3');
  });
});
