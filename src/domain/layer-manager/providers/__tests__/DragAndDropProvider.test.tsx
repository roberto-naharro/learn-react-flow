import * as React from 'react';

import { describe, expect, it } from '@jest/globals';
import { act, render, renderHook } from '@testing-library/react';

import { useDragAndDropContext } from '@domain-layer-manager/hooks/useDragAndDropContext';
import { DragAndDropProvider } from '@domain-layer-manager/providers/DragAndDropProvider';

describe('DragAndDropProvider', () => {
  it('should provide drag and drop context to children', () => {
    const TestConsumer = () => {
      const [draggedItem, setDraggedItem] = useDragAndDropContext();

      return (
        <div>
          <div data-testid="dragged-item">{draggedItem || 'none'}</div>
          <button data-testid="set-item" onClick={() => setDraggedItem('test-node')}>
            Set Item
          </button>
        </div>
      );
    };

    const { getByTestId } = render(
      <DragAndDropProvider>
        <TestConsumer />
      </DragAndDropProvider>,
    );

    // Initial state should be null
    expect(getByTestId('dragged-item')).toHaveTextContent('none');

    // Update state
    act(() => {
      getByTestId('set-item').click();
    });

    // State should be updated
    expect(getByTestId('dragged-item')).toHaveTextContent('test-node');
  });

  it('should expose context through hook when used with provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DragAndDropProvider>{children}</DragAndDropProvider>
    );

    const { result } = renderHook(() => useDragAndDropContext(), { wrapper });

    // Check initial state
    expect(result.current[0]).toBeNull();
    expect(typeof result.current[1]).toBe('function');

    // Update state
    act(() => {
      result.current[1]('input-node');
    });

    // Check updated state
    expect(result.current[0]).toBe('input-node');
  });
});
