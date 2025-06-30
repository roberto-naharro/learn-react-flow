import { Handle, Position } from '@xyflow/react';

import { sourceCustomNodeStyles } from './SourceCustomNode.styles';

export type SourceCustomNodeProps = {
  id: string;
  data: {
    url?: string;
    onUrlChange?: (id: string, url: string) => void;
  };
};
const SourceCustomNode = ({ data, id }: SourceCustomNodeProps) => {
  const styles = sourceCustomNodeStyles;
  return (
    <div style={styles.container}>
      <div style={styles.label}>Source</div>
      <input
        type="text"
        value={data.url ?? ''}
        onChange={(e) => data.onUrlChange?.(id, e.target.value)}
        placeholder="Enter GeoJSON URL"
        style={styles.input}
      />
      <Handle type="source" position={Position.Right} id={`${id}-source`} />
    </div>
  );
};

export default SourceCustomNode;
