import type { ReactNode } from 'react';
import { useCallback, useMemo } from 'react';

import { addEdge, useEdgesState } from '@xyflow/react';

import { EdgesContext } from '../../flow/context/EdgesContext';

import type { Connection, Edge } from '@xyflow/react';

export const EdgesProvider = ({ children }: { children: ReactNode }) => {
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const value = useMemo(
    () => ({
      edges,
      setEdges,
      onEdgesChange,
      onConnect,
    }),
    [edges, setEdges, onEdgesChange, onConnect],
  );

  return <EdgesContext.Provider value={value}>{children}</EdgesContext.Provider>;
};
