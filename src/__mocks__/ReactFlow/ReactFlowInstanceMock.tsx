import * as React from 'react';

import { jest } from '@jest/globals';

import type { ReactFlowInstance } from '@xyflow/react';

// Mock ReactFlow instance
export const ReactFlowInstanceMockFactory = (
  { nodes = [], edges = [], viewport = { x: 0, y: 0, zoom: 1 } } = {} as {
    nodes?: any[];
    edges?: any[];
    viewport?: { x: number; y: number; zoom: number };
  },
) =>
  ({
    toObject: jest.fn().mockReturnValue({ nodes, edges, viewport }),
    fitView: jest.fn(),
  }) as unknown as ReactFlowInstance;

// Mock for the entire @xyflow/react module
export const reactFlowMock = {
  // Components
  Background: ({ variant }: { variant?: string }) => (
    <div data-testid="mock-background" data-variant={variant} />
  ),
  Controls: () => <div data-testid="mock-controls" />,
  MiniMap: () => <div data-testid="mock-minimap" />,
  ReactFlow: ({
    children,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onInit,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: any;
  }) => (
    <div
      data-testid="mock-react-flow"
      data-has-handlers={Boolean(onNodesChange ?? onEdgesChange ?? onConnect ?? onInit)}
      {...props}
    >
      {children}
    </div>
  ),
  Panel: ({ children, position }: { children: React.ReactNode; position: string }) => (
    <div data-testid={`mock-panel-${position}`}>{children}</div>
  ),
  ReactFlowProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,

  // Constants
  BackgroundVariant: { Dots: 'dots', Lines: 'lines', Cross: 'cross' },
  ConnectionLineType: { Bezier: 'bezier', Straight: 'straight', Step: 'step' },

  // Hooks
  useReactFlow: () => ({
    screenToFlowPosition: jest.fn(({ x, y }) => ({ x, y })),
  }),
};
