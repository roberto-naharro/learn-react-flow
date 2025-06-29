import type { BasicNodeProps } from './BasicNode/types';
import type { CustomNodeProps } from './CustomNode/types';
import type { Prettify } from '../../../../types/utility';

export type NodeTypeProps = {
  type: string;
  label?: string;
  available?: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, nodeType: string) => void;
};

type BasicNode = Omit<BasicNodeProps, 'onDragStart'>;
type CustomNode = Omit<CustomNodeProps, 'onDragStart'>;

export type NodeTypes = Prettify<(BasicNode | CustomNode)[]>;

export function isNodeTypeProps(node: object): node is NodeTypeProps {
  return ['type'].every((key) => key in node);
}
