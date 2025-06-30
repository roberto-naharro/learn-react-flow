import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { reactFlowMock } from '../../../../../__mocks__/ReactFlow/ReactFlowInstanceMock';
import { ControlPanel } from '../ControlPanel';

// Mock dependencies
jest.mock('@xyflow/react', () => ({
  Panel: reactFlowMock.Panel,
}));

jest.mock('../NodePalette/NodePalette', () => ({
  NodePalette: () => <div data-testid="mock-node-palette">Node Palette Mock</div>,
}));

describe('ControlPanel', () => {
  it('should render the panel with title and node palette', () => {
    render(<ControlPanel />);

    // Check for panel wrapper - updated to use the correct testid
    expect(screen.getByTestId('mock-panel-top-left')).toBeInTheDocument();

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
