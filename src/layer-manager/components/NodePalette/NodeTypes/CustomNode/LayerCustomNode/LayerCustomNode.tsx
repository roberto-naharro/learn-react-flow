import NodeTypeContainer from '../../NodeTypeContainer';

import type { LayerCustomNodeProps } from './types';
import type { PartialKeys } from '../../../../../../types/utility';

const LayerCustomNode = ({
  label = 'Layer',
  ...props
}: PartialKeys<LayerCustomNodeProps, 'label'>) => (
  <NodeTypeContainer {...props}>{label}</NodeTypeContainer>
);

export default LayerCustomNode;
