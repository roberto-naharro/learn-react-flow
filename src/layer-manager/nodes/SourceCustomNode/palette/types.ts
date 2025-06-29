import {
  type NodePaletteTypeProps,
  isNodePaletteTypeProps,
} from '../../../components/ControlPanel/NodePalette/NodeTypes/types';

import type { NODE_SOURCE_TYPE_NAME } from '..';

export interface SourceCustomNodePaletteProps extends NodePaletteTypeProps {
  label?: 'Source';
  type: typeof NODE_SOURCE_TYPE_NAME;
  url: string;
}

export function isSourceCustomNodePaletteProps(node: object): node is SourceCustomNodePaletteProps {
  return isNodePaletteTypeProps(node) && node.type === 'source';
}
