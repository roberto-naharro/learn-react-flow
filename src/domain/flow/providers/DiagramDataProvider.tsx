import { useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

import { addEdge, useEdgesState, useNodesState } from '@xyflow/react';

import { DiagramDataContext } from '../context/DiagramDataContext';

import type { Connection, Edge, Node } from '@xyflow/react';

/**
 * Unified provider for diagram data including nodes and edges
 * Combines functionality of NodesProvider and EdgesProvider
 * Manages all React Flow state in a single provider
 */
export const DiagramDataProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Node operations
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

  // Edge operations
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const value = useMemo(
    () => ({
      // Node state and operations
      nodes,
      setNodes,
      onNodesChange,
      addNode,
      removeNode,
      updateNodeData,
      // Edge state and operations
      edges,
      setEdges,
      onEdgesChange,
      onConnect,
    }),
    [
      nodes,
      setNodes,
      onNodesChange,
      addNode,
      removeNode,
      updateNodeData,
      edges,
      setEdges,
      onEdgesChange,
      onConnect,
    ],
  );

  return <DiagramDataContext.Provider value={value}>{children}</DiagramDataContext.Provider>;
};
