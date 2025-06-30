import type * as React from 'react';

import { LayerCustomNode, NODE_LAYER_TYPE_NAME } from './LayerCustomNode';
import { NODE_SOURCE_TYPE_NAME, SourceCustomNode } from './SourceCustomNode';

const nodeTypes = {
  [NODE_SOURCE_TYPE_NAME]: SourceCustomNode,
  [NODE_LAYER_TYPE_NAME]: LayerCustomNode,
} as const;

type NodeTypes = { -readonly [P in keyof typeof nodeTypes]: (typeof nodeTypes)[P] };

type NodeTypeProps = {
  [key in keyof NodeTypes]?: React.ComponentProps<NodeTypes[key]>['data'];
};

export const getNodeTypes = (props: NodeTypeProps = {}) =>
  Object.entries(nodeTypes).reduce((acc, [key, Component]) => {
    acc[key] = (nodeProps: any) => (
      <Component {...nodeProps} data={{ ...nodeProps.data, ...props[key as keyof typeof props] }} />
    );
    return acc;
    // typescript goes crazy with the type inference in the reduce
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any) as NodeTypes;
