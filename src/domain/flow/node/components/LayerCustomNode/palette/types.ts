import {
  type NodePaletteTypeProps,
  isNodePaletteTypeProps,
} from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/types';

import type { NODE_LAYER_TYPE_NAME } from '..';

export interface LayerCustomNodePaletteProps extends NodePaletteTypeProps {
  label?: 'Layer';
  type: typeof NODE_LAYER_TYPE_NAME;
}

export function isLayerCustomNodePaletteProps(node: object): node is LayerCustomNodePaletteProps {
  return isNodePaletteTypeProps(node) && node.type === 'layer';
}
