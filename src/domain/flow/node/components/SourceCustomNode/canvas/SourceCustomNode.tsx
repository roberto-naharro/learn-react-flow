import { Handle, Position } from '@xyflow/react';

import { sourceCustomNodeStyles } from './SourceCustomNode.styles';

export type SourceCustomNodeProps = {
  id: string;
  data: {
    url?: string;
    onUrlChange?: (id: string, url: string) => void;
    geojsonError?: string;
    geojsonData?: unknown;
    status?: 'loading' | 'ready';
  };
};
const SourceCustomNode = ({ data, id }: SourceCustomNodeProps) => {
  const styles = sourceCustomNodeStyles;

  const getStatusLabel = () => {
    if (data.status === 'loading') return '🟡 Computing...';
    if (data.geojsonError) return '🔴 Error';
    if (data.geojsonData) return '🟢 Ready';
    return null;
  };

  const statusLabel = getStatusLabel();

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
      {statusLabel ? <div style={styles.statusLabel}>{statusLabel}</div> : null}
      {data.geojsonError ? <div style={styles.errorMessage}>{data.geojsonError}</div> : null}
      <Handle type="source" position={Position.Right} id={`${id}-source`} />
    </div>
  );
};

export default SourceCustomNode;
