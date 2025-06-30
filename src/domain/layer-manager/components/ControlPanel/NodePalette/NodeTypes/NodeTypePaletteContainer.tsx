import * as React from 'react';
import { useState } from 'react';

import { nodePaletteStyles } from '../NodePalette.styles';

import type { NodePaletteTypeProps } from './types';
import type { Prettify } from '../../../../../../shared/types/utility';

// Utility to create minimal drag event for keyboard accessibility
const createKeyboardDragEvent = (): React.DragEvent<HTMLElement> =>
  ({
    dataTransfer: {
      setData: () => {},
      effectAllowed: 'move' as const,
    },
  }) as unknown as React.DragEvent<HTMLElement>;

export type NodeTypePaletteContainerProps = Prettify<
  NodePaletteTypeProps & {
    children: React.ReactNode;
  }
>;

const NodeTypePaletteContainer = ({
  type,
  label,
  available = true,
  onDragStart,
  children,
}: NodeTypePaletteContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!available) return null;

  return (
    <button
      key={type}
      type="button"
      style={{
        ...nodePaletteStyles.paletteNode,
        ...(isHovered ? nodePaletteStyles.paletteNodeHover : {}),
      }}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Add ${label} node to canvas`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          // Handle keyboard activation for accessibility compliance
          onDragStart(createKeyboardDragEvent(), type);
        }
      }}
      onMouseDown={(event) => {
        // Allow drag to initiate but prevent button click side effects
        event.stopPropagation();
      }}
    >
      {children}
    </button>
  );
};

export default NodeTypePaletteContainer;
