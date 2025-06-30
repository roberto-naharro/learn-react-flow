import * as React from 'react';

import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { reactFlowMock } from '../../../../../__mocks__/ReactFlow/ReactFlowInstanceMock';
import { EdgesContext } from '../../../../flow/context/EdgesContext';
import { NodesContext } from '../../../../flow/node/context/NodesContext';
import { PersistenceContext } from '../../../context/PersistenceContext';
import { FlowCanvas } from '../FlowCanvas';

// Mock ReactFlow and hooks
jest.mock('@xyflow/react', () => ({
  Background: reactFlowMock.Background,
  BackgroundVariant: reactFlowMock.BackgroundVariant,
  ConnectionLineType: reactFlowMock.ConnectionLineType,
  Controls: reactFlowMock.Controls,
  MiniMap: reactFlowMock.MiniMap,
  ReactFlow: reactFlowMock.ReactFlow,
  Panel: reactFlowMock.Panel,
}));

// Mock other components
jest.mock('../../ControlPanel/ControlPanel', () => ({
  ControlPanel: () => <div data-testid="mock-control-panel" />,
}));

jest.mock('../../ActionPanel/ActionPanel', () => ({
  ActionPanel: () => <div data-testid="mock-action-panel" />,
}));

// Mock hooks
jest.mock('../../../hooks/useDragDrop', () => ({
  useDragDrop: () => ({
    onDrop: jest.fn(),
    onDragOver: jest.fn(),
  }),
}));

describe('FlowCanvas', () => {
  // Suppress console errors for this test
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  // Helper to render with all required contexts
  const renderWithContexts = () => {
    const nodesContextValue = {
      nodes: [],
      setNodes: jest.fn(),
      onNodesChange: jest.fn(),
      addNode: jest.fn(),
      removeNode: jest.fn(),
      updateNodeData: jest.fn(),
    };

    const edgesContextValue = {
      edges: [],
      setEdges: jest.fn(),
      onEdgesChange: jest.fn(),
      onConnect: jest.fn(),
    };

    const persistenceContextValue = {
      saveFlowState: jest.fn(() => true),
      restoreFlowState: jest.fn(() => true),
      resetFlowState: jest.fn(() => true),
      setReactFlowInstance: jest.fn(),
    };

    return render(
      <NodesContext.Provider value={nodesContextValue}>
        <EdgesContext.Provider value={edgesContextValue}>
          <PersistenceContext.Provider value={persistenceContextValue}>
            <FlowCanvas />
          </PersistenceContext.Provider>
        </EdgesContext.Provider>
      </NodesContext.Provider>,
    );
  };

  it('should render ReactFlow with all required components', () => {
    const { getByTestId } = renderWithContexts();

    // Check that ReactFlow is rendered
    expect(getByTestId('mock-react-flow')).toBeInTheDocument();

    // Check that UI controls are rendered
    expect(getByTestId('mock-controls')).toBeInTheDocument();
    expect(getByTestId('mock-minimap')).toBeInTheDocument();
    expect(getByTestId('mock-background')).toBeInTheDocument();

    // Check that custom components are rendered (directly, not through panels)
    expect(getByTestId('mock-control-panel')).toBeInTheDocument();
    expect(getByTestId('mock-action-panel')).toBeInTheDocument();
  });
});
