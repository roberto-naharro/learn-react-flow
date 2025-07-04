import { isNodePaletteTypeProps } from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/types';
import { type NodePaletteTypeProps } from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/types';

export interface BasicNodePaletteProps extends NodePaletteTypeProps {
  type: 'input' | 'default' | 'output';
  label: string;
}

export function isBasicNodePaletteProps(node: object): node is BasicNodePaletteProps {
  return isNodePaletteTypeProps(node) && ['input', 'default', 'output'].includes(node.type);
}
