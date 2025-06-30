import { Handle, Position } from '@xyflow/react';

import { layerCustomNodeStyles } from './LayerCustomNode.styles';

export type LayerCustomNodeProps = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  data: {};
};
const LayerCustomNode = ({ id }: LayerCustomNodeProps) => {
  const styles = layerCustomNodeStyles;
  return (
    <>
      <div style={styles.container}>
        <div style={styles.label}>Layer</div>
      </div>

      <Handle type="target" position={Position.Left} id={`${id}-target`} />
    </>
  );
};

export default LayerCustomNode;
