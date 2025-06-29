import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { useNodesState } from '@xyflow/react';

import { NodesContext } from '../context/NodesContext';

import type { Node } from '@xyflow/react';

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  // Add a node to the flow
  const addNode = useCallback(
    (node: Node) => {
      setNodes((nds) => nds.concat(node));
    },
    [setNodes],
  );

  // Remove a node by ID
  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    },
    [setNodes],
  );

  const value = useMemo(
    () => ({
      nodes,
      setNodes,
      onNodesChange,
      addNode,
      removeNode,
    }),
    [nodes, setNodes, onNodesChange, addNode, removeNode],
  );

  return <NodesContext.Provider value={value}>{children}</NodesContext.Provider>;
};
