import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { useNodesState } from '@xyflow/react';

import { NodesContext } from '../node/context/NodesContext';

import type { Node } from '@xyflow/react';

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  const addNode = useCallback(
    (node: Node) => {
      setNodes((nds) => nds.concat(node));
    },
    [setNodes],
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    },
    [setNodes],
  );

  const updateNodeData = useCallback(
    (nodeId: string, data: object) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node,
        ),
      );
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
      updateNodeData,
    }),
    [nodes, setNodes, onNodesChange, addNode, removeNode, updateNodeData],
  );

  return <NodesContext.Provider value={value}>{children}</NodesContext.Provider>;
};
