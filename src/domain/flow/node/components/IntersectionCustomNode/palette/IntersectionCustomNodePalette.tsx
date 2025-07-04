import type { PartialKeys } from '@shared/types/utility';

import NodeTypePaletteContainer from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import { intersectionCustomNodePaletteStyles } from './IntersectionCustomNodePalette.styles';

import type { IntersectionCustomNodePaletteProps } from './types';

const IntersectionCustomNodePalette = ({
  label = 'Intersection',
  ...props
}: PartialKeys<IntersectionCustomNodePaletteProps, 'label'>) => (
  <NodeTypePaletteContainer label={label} {...props}>
    <div style={intersectionCustomNodePaletteStyles.container}>
      <span style={intersectionCustomNodePaletteStyles.connectionLeftTop} />
      <span style={intersectionCustomNodePaletteStyles.connectionLeftBottom} />
      <span style={intersectionCustomNodePaletteStyles.connectionRight} />
      <h3 style={intersectionCustomNodePaletteStyles.label}>{label}</h3>
    </div>
  </NodeTypePaletteContainer>
);

export default IntersectionCustomNodePalette;
