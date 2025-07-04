import IntersectionCustomNodePalette from '@domain-flow/node/components/IntersectionCustomNode/palette/IntersectionCustomNodePalette';
import { isIntersectionCustomNodePaletteProps } from '@domain-flow/node/components/IntersectionCustomNode/palette/types';
import LayerCustomNodePalette from '@domain-flow/node/components/LayerCustomNode/palette/LayerCustomNodePalette';
import { isLayerCustomNodePaletteProps } from '@domain-flow/node/components/LayerCustomNode/palette/types';
import SourceCustomNodePalette from '@domain-flow/node/components/SourceCustomNode/palette/SourceCustomNodePalette';
import { isSourceCustomNodePaletteProps } from '@domain-flow/node/components/SourceCustomNode/palette/types';

import BasicNodePalette from './NodeTypes/BasicNodePalette/BasicNodePalette';
import { isBasicNodePaletteProps } from './NodeTypes/BasicNodePalette/types';

import type { NodePaletteTypeProps } from './NodeTypes/types';

export const SingleNodePalette = (props: NodePaletteTypeProps) => {
  if (isBasicNodePaletteProps(props)) {
    return <BasicNodePalette {...props} />;
  }
  if (isSourceCustomNodePaletteProps(props)) {
    return <SourceCustomNodePalette {...props} />;
  }
  if (isLayerCustomNodePaletteProps(props)) {
    return <LayerCustomNodePalette {...props} />;
  }
  if (isIntersectionCustomNodePaletteProps(props)) {
    return <IntersectionCustomNodePalette {...props} />;
  }
  return null;
};
