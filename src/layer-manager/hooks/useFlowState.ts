import { useCallback, useState } from 'react';

import { type Connection, addEdge, useEdgesState, useNodesState } from '@xyflow/react';

import { initialEdges, initialNodes } from '../data/initial-data';

export const useFlowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState('New Node');

  // Handle new connections between nodes
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Add a new node when button is clicked
  const addNode = useCallback(() => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      data: { label: nodeName || 'New Node' },
      position: {
        x: Math.random() * 500,
        y: Math.random() * 300,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [nodes, nodeName, setNodes]);

  return {
    nodes,
    edges,
    nodeName,
    setNodeName,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
  };
};
