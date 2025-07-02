import { NODE_INTERSECTION_TYPE_NAME } from '../components/IntersectionCustomNode';
import { NODE_SOURCE_TYPE_NAME } from '../components/SourceCustomNode';

import type { IntersectionCustomNodeProps } from '../components/IntersectionCustomNode/canvas/IntersectionCustomNode';
import type { SourceCustomNodeProps } from '../components/SourceCustomNode/canvas/SourceCustomNode';
import type { Edge, Node } from '@xyflow/react';

/**
 * Finds the two source URLs connected to an intersection node
 */
export function getConnectedIntersectionSources(
  intersectionNodeId: string,
  edges: Edge[],
  nodes: Node[],
): { sourceUrlA?: string; sourceUrlB?: string } {
  // Find incoming edges to this intersection node
  const incomingEdges = edges.filter((e) => e.target === intersectionNodeId);

  if (incomingEdges.length < 2) {
    return { sourceUrlA: undefined, sourceUrlB: undefined };
  }

  // Get the first two source nodes connected to this intersection
  const sourceNodeA = nodes.find(
    (n) => n.id === incomingEdges[0].source && n.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;

  const sourceNodeB = nodes.find(
    (n) => n.id === incomingEdges[1].source && n.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;

  return {
    sourceUrlA: sourceNodeA?.data?.url,
    sourceUrlB: sourceNodeB?.data?.url,
  };
}

/**
 * Checks if a node is an intersection node that can provide data to layers
 */
export function isIntersectionNode(node: Node): node is Node & IntersectionCustomNodeProps {
  return node.type === NODE_INTERSECTION_TYPE_NAME;
}
