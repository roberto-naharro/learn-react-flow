import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { useNodesState } from '@xyflow/react';

import { NodesContext } from '../context/NodesContext';

import type { Node } from '@xyflow/react';

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  const addNode = useCallback(
    (node: Node) => {
      setNodes((nds) => nds.concat(node));
    },
    [setNodes],
  );

  const value = useMemo(
    () => ({
      nodes,
      setNodes,
      onNodesChange,
      addNode,
    }),
    [nodes, setNodes, onNodesChange, addNode],
  );

  return <NodesContext.Provider value={value}>{children}</NodesContext.Provider>;
};
