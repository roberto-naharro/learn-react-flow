import { isNodeTypeProps } from '../types';
import { type NodeTypeProps } from '../types';

export interface BasicNodeProps extends NodeTypeProps {
  type: 'input' | 'default' | 'output';
  label: string;
}

export function isBasicNodeProps(node: object): node is BasicNodeProps {
  return isNodeTypeProps(node) && ['input', 'default', 'output'].includes(node.type);
}
