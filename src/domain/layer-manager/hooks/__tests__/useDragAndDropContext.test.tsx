import * as React from 'react';

import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook } from '@testing-library/react';

import { DragAndDropContext, type DragAndDropContextType } from '../../context/DragAndDropContext';
import { useDragAndDropContext } from '../useDragAndDropContext';

describe('useDragAndDropContext', () => {
  const originalConsoleError = console.error;
  beforeEach(() => {
    // Suppress console errors for this test
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should return context value when used within a provider', () => {
    // Mock context value
    const mockContextValue = ['test-node-type', jest.fn()] as DragAndDropContextType;

    // Create wrapper with provider
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DragAndDropContext.Provider value={mockContextValue}>{children}</DragAndDropContext.Provider>
    );

    // Render hook with wrapper
    const { result } = renderHook(() => useDragAndDropContext(), { wrapper });

    // Assert context value is returned correctly
    expect(result.current).toBe(mockContextValue);
    expect(result.current[0]).toBe('test-node-type');
    expect(typeof result.current[1]).toBe('function');
  });

  it('should throw error when used outside a provider', () => {
    // Expect hook to throw when used without provider
    expect(() => {
      renderHook(() => useDragAndDropContext());
    }).toThrow('useDragAndDropContext must be used within a DragAndDropProvider');
  });
});
