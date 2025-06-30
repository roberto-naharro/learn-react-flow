import { sourceCustomNodePaletteStyles } from './SourceCustomNodePalette.styles';
import NodeTypePaletteContainer from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import type { SourceCustomNodePaletteProps } from './types';
import type { PartialKeys } from '../../../../../../shared/types/utility';

const SourceCustomNodePalette = ({
  label = 'Source',
  ...props
}: PartialKeys<SourceCustomNodePaletteProps, 'label'>) => (
  <NodeTypePaletteContainer {...props}>
    <div style={sourceCustomNodePaletteStyles.container}>
      <span style={sourceCustomNodePaletteStyles.connectionRight} />
      <h3 style={sourceCustomNodePaletteStyles.label}>{label}</h3>
      <div>
        <input className="nodrag" type="text" disabled placeholder="GeoJSON URL" />
      </div>
    </div>
  </NodeTypePaletteContainer>
);

export default SourceCustomNodePalette;
