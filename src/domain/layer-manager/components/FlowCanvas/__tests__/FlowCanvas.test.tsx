import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { render } from '@testing-library/react';

import { reactFlowMock } from '../../../../../__mocks__/ReactFlow/ReactFlowInstanceMock';
import { buildDiagramDataContextMock } from '../../../../flow/context/__mocks__/DiagramDataContextMock';
import { DiagramDataContext } from '../../../../flow/context/DiagramDataContext';
import { buildPersistenceContextMock } from '../../../context/__mocks__/PersistenceContextMock';
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

  const renderWithContexts = () => {
    const diagramDataContextValue = buildDiagramDataContextMock();
    const persistenceContextValue = buildPersistenceContextMock();

    return render(
      <DiagramDataContext.Provider value={diagramDataContextValue}>
        <PersistenceContext.Provider value={persistenceContextValue}>
          <FlowCanvas />
        </PersistenceContext.Provider>
      </DiagramDataContext.Provider>,
    );
  };

  it('should render ReactFlow with all required components', () => {
    const { getByTestId } = renderWithContexts();

    expect(getByTestId('mock-react-flow')).toBeInTheDocument();

    expect(getByTestId('mock-controls')).toBeInTheDocument();
    expect(getByTestId('mock-minimap')).toBeInTheDocument();
    expect(getByTestId('mock-background')).toBeInTheDocument();

    expect(getByTestId('mock-control-panel')).toBeInTheDocument();
    expect(getByTestId('mock-action-panel')).toBeInTheDocument();
  });
});
