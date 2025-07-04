import type { PartialKeys } from '@shared/types/utility';

import NodeTypePaletteContainer from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import { sourceCustomNodePaletteStyles } from './SourceCustomNodePalette.styles';

import type { SourceCustomNodePaletteProps } from './types';

const SourceCustomNodePalette = ({
  label = 'Source',
  ...props
}: PartialKeys<SourceCustomNodePaletteProps, 'label'>) => (
  <NodeTypePaletteContainer label={label} {...props}>
    <div style={sourceCustomNodePaletteStyles.container}>
      <span style={sourceCustomNodePaletteStyles.connectionRight} />
      <h3 style={sourceCustomNodePaletteStyles.label}>{label}</h3>
      <div style={sourceCustomNodePaletteStyles.inputContainer}>
        <input
          className="nodrag"
          type="text"
          disabled
          placeholder="GeoJSON URL"
          style={sourceCustomNodePaletteStyles.input}
        />
      </div>
    </div>
  </NodeTypePaletteContainer>
);

export default SourceCustomNodePalette;
