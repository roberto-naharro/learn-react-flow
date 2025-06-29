import * as React from 'react';

import { nodePaletteStyles } from '../NodePalette.styles';

import type { NodeTypeProps } from './types';
import type { Prettify } from '../../../../types/utility';

export type NodeTypeContainerProps = Prettify<
  NodeTypeProps & {
    children: React.ReactNode;
  }
>;

const NodeTypeContainer = ({
  type,
  label,
  available = true,
  onDragStart,
  children,
}: NodeTypeContainerProps) =>
  available ? (
    <div
      key={type}
      style={{
        ...nodePaletteStyles.dragAndDropNode,
        cursor: 'grab',
      }}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className={'dndnode' + (type ? ` ${type}` : '')}
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
  ) : null;

export default NodeTypeContainer;
