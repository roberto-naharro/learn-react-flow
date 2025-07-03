import * as React from 'react';

import { jest } from '@jest/globals';

import type * as reactFlow from '@xyflow/react';

type ReactFlow = typeof reactFlow;

const propsToDataPropsValues = (props: Record<string, any>) =>
  Object.entries(props).reduce(
    (acc, [key, value]) => {
      if (value === undefined || value === null) return acc;
      acc[`data-${key}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

const getDataTestIdDiv = (testId: string, withMemo: boolean = true): any => {
  const component = ({ children = null, ...props }) => (
    <div data-testid={testId} {...propsToDataPropsValues(props)}>
      {children}
    </div>
  );

  if (!withMemo) {
    return component;
  }

  return React.memo(component);
};

export const _reactFlowMockBuilders = {
  ReactFlowInstance: (
    { nodes = [], edges = [], viewport = { x: 0, y: 0, zoom: 1 } } = {} as {
      nodes?: any[];
      edges?: any[];
      viewport?: { x: number; y: number; zoom: number };
    },
  ) =>
    ({
      toObject: jest
        .fn<reactFlow.ReactFlowInstance['toObject']>()
        .mockReturnValue({ nodes, edges, viewport }),
      fitView: jest.fn<reactFlow.ReactFlowInstance['fitView']>(),
    }) satisfies Partial<reactFlow.ReactFlowInstance> as unknown as reactFlow.ReactFlowInstance,
};
export const ReactFlowProvider = getDataTestIdDiv('mock-react-flow-provider', false);
export const Background = getDataTestIdDiv('mock-background');
export const BackgroundVariant = {
  Dots: 'dots',
  Lines: 'lines',
  Cross: 'cross',
} as ReactFlow['BackgroundVariant'];
export const Controls = getDataTestIdDiv('mock-controls');
export const MiniMap = getDataTestIdDiv('mock-minimap');
export const ReactFlow = (({
  children,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onInit,
  onError,
  ...props
}) => (
  <div
    data-testid="mock-react-flow"
    data-has-handlers={Boolean(onNodesChange ?? onEdgesChange ?? onConnect ?? onInit ?? onError)}
    {...props}
  >
    {children}
  </div>
)) as ReactFlow['ReactFlow'];
export const Handle = getDataTestIdDiv('mock-handle');
export const Position = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as ReactFlow['Position'];
export const addEdge = jest.fn<ReactFlow['addEdge']>() as ReactFlow['addEdge'];
export const useEdgesState = jest.fn<ReactFlow['useEdgesState']>() as ReactFlow['useEdgesState'];
export const useNodesState = jest.fn<ReactFlow['useNodesState']>() as ReactFlow['useNodesState'];
export const Panel = getDataTestIdDiv('mock-panel', false);
export const ConnectionLineType = {
  Bezier: 'default',
  Straight: 'straight',
  Step: 'step',
  SmoothStep: 'smoothstep',
  SimpleBezier: 'simplebezier',
} as ReactFlow['ConnectionLineType'];
export const useReactFlow = jest.fn<ReactFlow['useReactFlow']>() as ReactFlow['useReactFlow'];
