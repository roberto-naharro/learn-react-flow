import { layerCustomNodePaletteStyles } from './LayerCustomNodePalette.styles';
import NodeTypePaletteContainer from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import type { LayerCustomNodePaletteProps } from './types';
import type { PartialKeys } from '../../../../../../shared/types/utility';

const LayerCustomNodePalette = ({
  label = 'Layer',
  ...props
}: PartialKeys<LayerCustomNodePaletteProps, 'label'>) => (
  <NodeTypePaletteContainer {...props}>
    <div style={layerCustomNodePaletteStyles.container}>
      <span style={layerCustomNodePaletteStyles.connectionLeft} />
      <h3 style={layerCustomNodePaletteStyles.label}>{label}</h3>
    </div>
  </NodeTypePaletteContainer>
);

export default LayerCustomNodePalette;
