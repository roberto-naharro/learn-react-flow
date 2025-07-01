import { Handle, Position } from '@xyflow/react';

import { sourceCustomNodeStyles } from './SourceCustomNode.styles';

export type SourceCustomNodeProps = {
  id: string;
  data: {
    url?: string;
    onUrlChange?: (id: string, url: string) => void;
    geojsonError?: string;
    geojsonData?: unknown;
  };
};
const SourceCustomNode = ({ data, id }: SourceCustomNodeProps) => {
  const styles = sourceCustomNodeStyles;
  let statusMessage = null;
  if (data.geojsonError) {
    statusMessage = <div style={styles.error}>❌ Error: {data.geojsonError}</div>;
  } else if (data.geojsonData) {
    statusMessage = <div style={styles.success}> ✅ GeoJSON Loaded Successfully</div>;
  }

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
      <div style={styles.errorContainer}>{statusMessage}</div>
      <Handle type="source" position={Position.Right} id={`${id}-source`} />
    </div>
  );
};

export default SourceCustomNode;
