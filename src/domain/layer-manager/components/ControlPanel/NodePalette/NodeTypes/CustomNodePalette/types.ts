import type { Prettify } from '@shared/types/utility';

import { isIntersectionCustomNodePaletteProps } from '@domain-flow/node/components/IntersectionCustomNode/palette/types';
import type { IntersectionCustomNodePaletteProps } from '@domain-flow/node/components/IntersectionCustomNode/palette/types';
import { isLayerCustomNodePaletteProps } from '@domain-flow/node/components/LayerCustomNode/palette/types';
import type { LayerCustomNodePaletteProps } from '@domain-flow/node/components/LayerCustomNode/palette/types';
import { isSourceCustomNodePaletteProps } from '@domain-flow/node/components/SourceCustomNode/palette/types';
import type { SourceCustomNodePaletteProps } from '@domain-flow/node/components/SourceCustomNode/palette/types';

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
