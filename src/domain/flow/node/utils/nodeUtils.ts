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
): { firstSourceUrl?: string; secondSourceUrl?: string } {
  // Find incoming edges to this intersection node
  const incomingEdges = edges.filter((e) => e.target === intersectionNodeId);

  if (incomingEdges.length < 2) {
    return { firstSourceUrl: undefined, secondSourceUrl: undefined };
  }

  // Get the first two source nodes connected to this intersection
  const firstSourceNode = nodes.find(
    (node) => node.id === incomingEdges[0].source && node.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;

  const secondSourceNode = nodes.find(
    (node) => node.id === incomingEdges[1].source && node.type === NODE_SOURCE_TYPE_NAME,
  ) as SourceCustomNodeProps;

  return {
    firstSourceUrl: firstSourceNode?.data?.url,
    secondSourceUrl: secondSourceNode?.data?.url,
  };
}

/**
 * Checks if a node is an intersection node that can provide data to layers
 */
export function isIntersectionNode(node: Node): node is Node & IntersectionCustomNodeProps {
  return node.type === NODE_INTERSECTION_TYPE_NAME;
}
