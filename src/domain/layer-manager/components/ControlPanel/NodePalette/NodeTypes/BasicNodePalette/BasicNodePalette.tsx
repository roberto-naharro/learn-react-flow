import NodeTypePaletteContainer from '@domain-layer-manager/components/ControlPanel/NodePalette/NodeTypes/NodeTypePaletteContainer';

import type { BasicNodePaletteProps } from './types';

const BasicNodePalette = (props: BasicNodePaletteProps) => (
  <NodeTypePaletteContainer {...props}>{props.label}</NodeTypePaletteContainer>
);

export default BasicNodePalette;
