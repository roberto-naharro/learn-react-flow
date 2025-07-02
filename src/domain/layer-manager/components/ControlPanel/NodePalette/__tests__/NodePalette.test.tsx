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

    expect(screen.getByText('Input Node')).toBeInTheDocument();
    expect(screen.getByText('Default Node')).toBeInTheDocument();
    expect(screen.getByText('Output Node')).toBeInTheDocument();
  });

  it('should set the correct data when dragging', () => {
    renderBasicNodeNodePalette();

    const nodeButton = screen.getByText('Input Node');
    const dataTransfer = {
      setData: jest.fn(),
      effectAllowed: null,
    };

    fireEvent.dragStart(nodeButton, { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalledWith('application/reactflow', 'input');
    expect(dataTransfer.effectAllowed).toBe('move');
  });

  it('should have draggable accessible buttons', () => {
    renderBasicNodeNodePalette();

    const nodeButtons = screen.getAllByRole('button');
    expect(nodeButtons).toHaveLength(3);

    // Buttons must be both accessible AND draggable
    nodeButtons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('draggable', 'true');
    });
  });
});
