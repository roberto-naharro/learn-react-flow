import * as React from 'react';
import { useState } from 'react';

import { nodePaletteStyles } from '../NodePalette.styles';

import type { NodePaletteTypeProps } from './types';
import type { Prettify } from '../../../../../../shared/types/utility';

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
    <div
      key={type}
      style={{
        ...nodePaletteStyles.paletteNode,
        ...(isHovered ? nodePaletteStyles.paletteNodeHover : {}),
      }}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`Drag ${label}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          // Simulate drag start on keyboard interaction
          const dragEvent: React.DragEvent<HTMLDivElement> = new DragEvent('dragstart', {
            bubbles: true,
          });
          event.currentTarget.dispatchEvent(dragEvent);
          onDragStart(dragEvent, type);
        }
      }}
    >
      {children}
    </div>
  );
};

export default NodeTypePaletteContainer;
