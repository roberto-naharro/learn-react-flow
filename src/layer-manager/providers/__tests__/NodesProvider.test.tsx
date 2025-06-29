import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactFlowProvider } from '@xyflow/react';

import { useNodesContext } from '../../hooks/useNodesContext';
import { NodesProvider } from '../NodesProvider';

describe('NodesProvider', () => {
  // Inner component that uses the nodes context
  const NodeControls = () => {
    const { nodes, addNode, removeNode } = useNodesContext();

    return (
      <div>
        <div data-testid="node-count">{nodes.length}</div>
        <button
          data-testid="add-node"
          onClick={() =>
            addNode({
              id: `test-${nodes.length}`, // Use unique IDs based on count
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
      </div>
    );
  };

  // Wrapper component that provides context
  const TestComponent = () => {
    return (
      <ReactFlowProvider>
        <NodesProvider>
          <NodeControls />
        </NodesProvider>
      </ReactFlowProvider>
    );
  };

  it('should provide nodes state and operations', () => {
    render(<TestComponent />);

    // Initially no nodes
    expect(screen.getByTestId('node-count').textContent).toBe('0');

    // Add a node
    fireEvent.click(screen.getByTestId('add-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('1');

    // Remove the node
    fireEvent.click(screen.getByTestId('remove-node'));
    expect(screen.getByTestId('node-count').textContent).toBe('0');
  });

  it('should handle multiple nodes', () => {
    render(<TestComponent />);

    // Add multiple nodes
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));
    fireEvent.click(screen.getByTestId('add-node'));

    expect(screen.getByTestId('node-count').textContent).toBe('3');

    // Remove a node
    fireEvent.click(screen.getByTestId('remove-node'));
    // Now there should be 2 nodes left
    expect(screen.getByTestId('node-count').textContent).toBe('2');
  });
});
