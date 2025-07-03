import type { PartialKeys } from '@shared/types/utility';

import NodeTypePaletteContainer from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import { layerCustomNodePaletteStyles } from './LayerCustomNodePalette.styles';

import type { LayerCustomNodePaletteProps } from './types';

const LayerCustomNodePalette = ({
  label = 'Layer',
  ...props
}: PartialKeys<LayerCustomNodePaletteProps, 'label'>) => (
  <NodeTypePaletteContainer label={label} {...props}>
    <div style={layerCustomNodePaletteStyles.container}>
      <span style={layerCustomNodePaletteStyles.connectionLeft} />
      <h3 style={layerCustomNodePaletteStyles.label}>{label}</h3>
    </div>
  </NodeTypePaletteContainer>
);

export default LayerCustomNodePalette;
