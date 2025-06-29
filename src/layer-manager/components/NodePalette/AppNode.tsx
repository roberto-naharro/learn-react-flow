import BasicNode from './NodeTypes/BasicNode/BasicNode';
import { isBasicNodeProps } from './NodeTypes/BasicNode/types';
import LayerCustomNode from './NodeTypes/CustomNode/LayerCustomNode/LayerCustomNode';
import { isLayerCustomNodeProps } from './NodeTypes/CustomNode/LayerCustomNode/types';
import SourceCustomNode from './NodeTypes/CustomNode/SourceCustomNode/SourceCustomNode';
import { isSourceCustomNodeProps } from './NodeTypes/CustomNode/SourceCustomNode/types';

import type { NodeTypeProps } from './NodeTypes/types';

export const AppNode = (props: NodeTypeProps) => {
  if (isBasicNodeProps(props)) {
    return <BasicNode {...props} />;
  }
  if (isSourceCustomNodeProps(props)) {
    return <SourceCustomNode {...props} />;
  }
  if (isLayerCustomNodeProps(props)) {
    return <LayerCustomNode {...props} />;
  }
  return null;
};
