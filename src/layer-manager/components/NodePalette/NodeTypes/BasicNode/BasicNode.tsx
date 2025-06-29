import NodeTypeContainer from '../NodeTypeContainer';

import type { BasicNodeProps } from './types';

const BasicNode = (props: BasicNodeProps) => (
  <NodeTypeContainer {...props}>{props.label}</NodeTypeContainer>
);

export default BasicNode;
