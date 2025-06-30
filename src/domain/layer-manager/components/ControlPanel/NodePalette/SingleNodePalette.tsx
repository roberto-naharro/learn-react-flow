import BasicNodePalette from './NodeTypes/BasicNodePalette/BasicNodePalette';
import { isBasicNodePaletteProps } from './NodeTypes/BasicNodePalette/types';
import LayerCustomNodePalette from '../../../../flow/node/components/LayerCustomNode/palette/LayerCustomNodePalette';
import { isLayerCustomNodePaletteProps } from '../../../../flow/node/components/LayerCustomNode/palette/types';
import SourceCustomNodePalette from '../../../../flow/node/components/SourceCustomNode/palette/SourceCustomNodePalette';
import { isSourceCustomNodePaletteProps } from '../../../../flow/node/components/SourceCustomNode/palette/types';

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
