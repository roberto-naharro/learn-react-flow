import { type NodeTypeProps, isNodeTypeProps } from '../../types';

export interface LayerCustomNodeProps extends NodeTypeProps {
  label?: 'Layer';
  type: 'layer';
}

export function isLayerCustomNodeProps(node: object): node is LayerCustomNodeProps {
  return isNodeTypeProps(node) && node.type === 'layer';
}
