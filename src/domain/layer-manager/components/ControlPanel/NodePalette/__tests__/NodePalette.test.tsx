import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import { NodePalette } from '../NodePalette';

import type { NodePaletteTypes } from '../NodeTypes/types';

describe('NodePalette component', () => {
  const renderBasicNodeNodePalette = () => {
    const nodeTypes = [
      { type: 'input', label: 'Input Node', available: true },
      { type: 'default', label: 'Default Node', available: true },
      { type: 'output', label: 'Output Node', available: true },
    ] as const satisfies NodePaletteTypes;

    return render(<NodePalette nodeTypes={nodeTypes} />);
  };

  it('should render all node basic node types', () => {
    renderBasicNodeNodePalette();

    // Check that all node types are rendered
    expect(screen.getByText('Input Node')).toBeInTheDocument();
    expect(screen.getByText('Default Node')).toBeInTheDocument();
    expect(screen.getByText('Output Node')).toBeInTheDocument();
  });

  it('should set the correct data when dragging', () => {
    renderBasicNodeNodePalette();

    // Get a node button
    const nodeButton = screen.getByText('Input Node');

    // Create a drag event
    const dataTransfer = {
      setData: jest.fn(),
      effectAllowed: null,
    };

    // Simulate drag start
    fireEvent.dragStart(nodeButton, { dataTransfer });

    // Check that the correct data was set
    expect(dataTransfer.setData).toHaveBeenCalledWith('application/reactflow', 'input');
    expect(dataTransfer.effectAllowed).toBe('move');
  });

  it('should have draggable buttons', () => {
    renderBasicNodeNodePalette();

    // Get all node buttons
    const nodeButtons = screen.getAllByRole('button');

    // Check that all buttons are draggable
    nodeButtons.forEach((button) => {
      expect(button).toHaveAttribute('draggable', 'true');
    });
  });
});
