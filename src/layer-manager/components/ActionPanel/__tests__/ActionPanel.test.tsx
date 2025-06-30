import { afterAll, beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import { RouterProvider } from '../../../../router/provider';
import {
  PersistenceContext,
  type PersistenceContextType,
} from '../../../context/PersistenceContext';
import { ActionPanel } from '../ActionPanel';

describe('ActionPanel', () => {
  // Mock persistence context values and functions
  const mockSaveFlowState = jest.fn();
  const mockRestoreFlowState = jest.fn();
  const mockResetFlowState = jest.fn();

  const renderWithContext = () => {
    const contextValue = {
      saveFlowState: mockSaveFlowState,
      restoreFlowState: mockRestoreFlowState,
      resetFlowState: mockResetFlowState,
      setReactFlowInstance: jest.fn(),
    } as PersistenceContextType;

    return render(
      <RouterProvider>
        <PersistenceContext.Provider value={contextValue}>
          <ActionPanel />
        </PersistenceContext.Provider>
      </RouterProvider>,
    );
  };

  let originalPushState: typeof window.history.pushState;

  beforeAll(() => {
    originalPushState = window.history.pushState;
    window.history.pushState = jest.fn();
  });

  afterAll(() => {
    window.history.pushState = originalPushState;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all action buttons', () => {
    renderWithContext();

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Restore')).toBeInTheDocument();
    expect(screen.getByText('Reset Diagram')).toBeInTheDocument();
  });

  it('should call saveFlowState when Save button is clicked', () => {
    renderWithContext();

    fireEvent.click(screen.getByText('Save'));
    expect(mockSaveFlowState).toHaveBeenCalledTimes(1);
  });

  it('should call restoreFlowState when Restore button is clicked', () => {
    renderWithContext();

    fireEvent.click(screen.getByText('Restore'));
    expect(mockRestoreFlowState).toHaveBeenCalledTimes(1);
  });

  it('should call resetFlowState when Reset button is clicked', () => {
    renderWithContext();

    fireEvent.click(screen.getByText('Reset Diagram'));
    expect(mockResetFlowState).toHaveBeenCalledTimes(1);
  });

  it('should navigate to map when Show Map button is clicked', () => {
    renderWithContext();

    fireEvent.click(screen.getByText('Show Map'));
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/map');
  });
});
