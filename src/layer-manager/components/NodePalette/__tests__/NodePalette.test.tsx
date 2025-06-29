import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import { NodePalette } from '../NodePalette';

describe('NodePalette component', () => {
  it('should render all node types', () => {
    render(<NodePalette />);

    // Check that all node types are rendered
    expect(screen.getByText('Input Node')).toBeInTheDocument();
    expect(screen.getByText('Default Node')).toBeInTheDocument();
    expect(screen.getByText('Output Node')).toBeInTheDocument();
  });

  it('should set the correct data when dragging', () => {
    render(<NodePalette />);

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
    render(<NodePalette />);

    // Get all node buttons
    const nodeButtons = screen.getAllByRole('button');

    // Check that all buttons are draggable
    nodeButtons.forEach((button) => {
      expect(button).toHaveAttribute('draggable', 'true');
    });
  });
});
