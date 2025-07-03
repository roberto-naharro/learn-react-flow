import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { ControlPanel } from '@domain-layer-manager/components/ControlPanel/ControlPanel';

// Mock dependencies
jest.mock('@xyflow/react');

jest.mock('../NodePalette/NodePalette', () => ({
  NodePalette: () => <div data-testid="mock-node-palette">Node Palette Mock</div>,
}));

describe('ControlPanel', () => {
  it('should render the panel with title and node palette', () => {
    render(<ControlPanel />);

    // Check for panel wrapper - updated to use the correct testid
    const panelElement = screen.getByTestId('mock-panel');
    expect(panelElement).toBeInTheDocument();
    // expect to have the correct data attribute ' for positioning
    expect(panelElement).toHaveAttribute('data-position', 'top-left');

    // Check for title
    expect(screen.getByText('Flow Diagram')).toBeInTheDocument();

    // Check for subtitle
    expect(screen.getByText('Drag Nodes')).toBeInTheDocument();

    // Check for node palette
    expect(screen.getByTestId('mock-node-palette')).toBeInTheDocument();

    // Check for instructions
    expect(screen.getByText('Drag and drop nodes from the palette.')).toBeInTheDocument();
    expect(screen.getByText('Connect nodes by dragging between handles.')).toBeInTheDocument();
    expect(screen.getByText('Delete nodes or edges with Delete/Backspace.')).toBeInTheDocument();
  });
});
