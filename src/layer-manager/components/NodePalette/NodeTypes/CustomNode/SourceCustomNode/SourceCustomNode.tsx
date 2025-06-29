import NodeTypeContainer from '../../NodeTypeContainer';

import type { SourceCustomNodeProps } from './types';
import type { PartialKeys } from '../../../../../../types/utility';

const SourceCustomNode = ({
  label = 'Source',
  ...props
}: PartialKeys<SourceCustomNodeProps, 'label'>) => (
  <NodeTypeContainer {...props}>{label}</NodeTypeContainer>
);

export default SourceCustomNode;
