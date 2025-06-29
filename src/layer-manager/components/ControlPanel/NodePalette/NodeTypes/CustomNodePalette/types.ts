import { isLayerCustomNodePaletteProps } from '../../../../../nodes/LayerCustomNode/palette/types';
import { isSourceCustomNodePaletteProps } from '../../../../../nodes/SourceCustomNode/palette/types';

import type { Prettify } from '../../../../../../types/utility';
import type { LayerCustomNodePaletteProps } from '../../../../../nodes/LayerCustomNode/palette/types';
import type { SourceCustomNodePaletteProps } from '../../../../../nodes/SourceCustomNode/palette/types';

export type CustomNodePaletteProps = Prettify<
  SourceCustomNodePaletteProps | LayerCustomNodePaletteProps
>;

export function isCustomNodePaletteProps(node: object): node is CustomNodePaletteProps {
  return isSourceCustomNodePaletteProps(node) || isLayerCustomNodePaletteProps(node);
}
