import { isLayerCustomNodeProps } from './LayerCustomNode/types';
import { isSourceCustomNodeProps } from './SourceCustomNode/types';

import type { LayerCustomNodeProps } from './LayerCustomNode/types';
import type { SourceCustomNodeProps } from './SourceCustomNode/types';
import type { Prettify } from '../../../../../types/utility';

export type CustomNodeProps = Prettify<SourceCustomNodeProps | LayerCustomNodeProps>;

export function isCustomNodeProps(node: object): node is CustomNodeProps {
  return isSourceCustomNodeProps(node) || isLayerCustomNodeProps(node);
}
