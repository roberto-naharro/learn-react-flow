import BasicNodePalette from './NodeTypes/BasicNodePalette/BasicNodePalette';
import { isBasicNodePaletteProps } from './NodeTypes/BasicNodePalette/types';
import LayerCustomNodePalette from '../../../nodes/LayerCustomNode/palette/LayerCustomNodePalette';
import { isLayerCustomNodePaletteProps } from '../../../nodes/LayerCustomNode/palette/types';
import SourceCustomNodePalette from '../../../nodes/SourceCustomNode/palette/SourceCustomNodePalette';
import { isSourceCustomNodePaletteProps } from '../../../nodes/SourceCustomNode/palette/types';

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
  return null;
};
