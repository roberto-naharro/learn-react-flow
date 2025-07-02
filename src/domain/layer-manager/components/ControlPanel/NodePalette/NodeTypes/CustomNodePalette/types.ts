import { isIntersectionCustomNodePaletteProps } from '../../../../../../flow/node/components/IntersectionCustomNode/palette/types';
import { isLayerCustomNodePaletteProps } from '../../../../../../flow/node/components/LayerCustomNode/palette/types';
import { isSourceCustomNodePaletteProps } from '../../../../../../flow/node/components/SourceCustomNode/palette/types';

import type { Prettify } from '../../../../../../../shared/types/utility';
import type { IntersectionCustomNodePaletteProps } from '../../../../../../flow/node/components/IntersectionCustomNode/palette/types';
import type { LayerCustomNodePaletteProps } from '../../../../../../flow/node/components/LayerCustomNode/palette/types';
import type { SourceCustomNodePaletteProps } from '../../../../../../flow/node/components/SourceCustomNode/palette/types';

export type CustomNodePaletteProps = Prettify<
  SourceCustomNodePaletteProps | LayerCustomNodePaletteProps | IntersectionCustomNodePaletteProps
>;

export function isCustomNodePaletteProps(node: object): node is CustomNodePaletteProps {
  return (
    isSourceCustomNodePaletteProps(node) ||
    isLayerCustomNodePaletteProps(node) ||
    isIntersectionCustomNodePaletteProps(node)
  );
}
