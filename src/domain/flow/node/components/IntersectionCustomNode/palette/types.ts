import {
  type NodePaletteTypeProps,
  isNodePaletteTypeProps,
} from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodeTypes/types';

import type { NODE_INTERSECTION_TYPE_NAME } from '..';

export interface IntersectionCustomNodePaletteProps extends NodePaletteTypeProps {
  label?: 'Intersection';
  type: typeof NODE_INTERSECTION_TYPE_NAME;
}

export function isIntersectionCustomNodePaletteProps(
  node: object,
): node is IntersectionCustomNodePaletteProps {
  return isNodePaletteTypeProps(node) && node.type === 'intersection';
}
