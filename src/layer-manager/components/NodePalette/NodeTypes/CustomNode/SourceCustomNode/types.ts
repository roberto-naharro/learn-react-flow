import { type NodeTypeProps, isNodeTypeProps } from '../../types';

export interface SourceCustomNodeProps extends NodeTypeProps {
  label?: 'Source';
  type: 'source';
  url: string;
}

export function isSourceCustomNodeProps(node: object): node is SourceCustomNodeProps {
  return isNodeTypeProps(node) && node.type === 'source';
}
