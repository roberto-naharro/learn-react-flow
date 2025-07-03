import { useContext } from 'react';

import { DiagramDataContext } from '@domain-flow/context/DiagramDataContext';
import type { DiagramDataContextType } from '@domain-flow/context/DiagramDataContext';

/**
 * Hook to access unified diagram data (nodes and edges)
 * Replaces useNodesContext and useEdgesContext
 * @returns Combined nodes and edges context
 */
export const useDiagramData = (): DiagramDataContextType => {
  const context = useContext(DiagramDataContext);
  if (context === undefined) {
    throw new Error('useDiagramData must be used within a DiagramDataProvider');
  }
  return context;
};

/**
 * Hook to access only nodes from diagram data
 * Provides backward compatibility with useNodesContext
 * @returns Nodes subset of diagram data context
 */
export const useNodesContext = () => {
  const { nodes, setNodes, onNodesChange, addNode, removeNode, updateNodeData } = useDiagramData();

  return {
    nodes,
    setNodes,
    onNodesChange,
    addNode,
    removeNode,
    updateNodeData,
  };
};

/**
 * Hook to access only edges from diagram data
 * Provides backward compatibility with useEdgesContext
 * @returns Edges subset of diagram data context
 */
export const useEdgesContext = () => {
  const { edges, setEdges, onEdgesChange, onConnect } = useDiagramData();

  return {
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
  };
};
