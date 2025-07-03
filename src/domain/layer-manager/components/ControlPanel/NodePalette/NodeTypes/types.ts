import type { Prettify } from '@shared/types/utility';

import type { BasicNodePaletteProps } from './BasicNodePalette/types';
import type { CustomNodePaletteProps } from './CustomNodePalette/types';

export type NodePaletteTypeProps = {
  type: string;
  label?: string;
  available?: boolean;
  onDragStart: (event: React.DragEvent<HTMLElement>, nodeType: string) => void;
};

type BasicNodePalette = Omit<BasicNodePaletteProps, 'onDragStart'>;
type CustomNodePalette = Omit<CustomNodePaletteProps, 'onDragStart'>;

export type NodePaletteTypes = Prettify<(BasicNodePalette | CustomNodePalette)[]>;

export function isNodePaletteTypeProps(node: object): node is NodePaletteTypeProps {
  return ['type'].every((key) => key in node);
}
