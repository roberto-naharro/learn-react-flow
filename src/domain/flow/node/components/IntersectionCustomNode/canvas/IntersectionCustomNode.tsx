import { Handle, Position } from '@xyflow/react';

import { intersectionCustomNodeStyles } from './IntersectionCustomNode.styles';

export type IntersectionCustomNodeProps = {
  id: string;
  data: {
    geojsonError?: string;
    geojsonData?: unknown;
    status?: 'loading' | 'ready';
  };
};

const IntersectionCustomNode = ({ data, id }: IntersectionCustomNodeProps) => {
  const styles = intersectionCustomNodeStyles;

  const getStatusLabel = () => {
    if (data.status === 'loading') return '🟡 Computing...';
    if (data.geojsonError) return '🔴 Error';
    if (data.geojsonData) return '🟢 Ready';
    return null;
  };

  const statusLabel = getStatusLabel();

  return (
    <div style={styles.container}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-target-a`}
        style={styles.handleLeft}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-target-b`}
        style={styles.handleLeftBottom}
      />
      <div style={styles.label}>Intersection</div>
      {statusLabel ? <div style={styles.statusLabel}>{statusLabel}</div> : null}
      {data.geojsonError && <div style={styles.errorMessage}>{data.geojsonError}</div>}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-source`}
        style={styles.handleRight}
      />
    </div>
  );
};

export default IntersectionCustomNode;
