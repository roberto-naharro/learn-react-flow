import { jest } from '@jest/globals';

import type { PersistenceContextType } from '../PersistenceContext';

// Exportable mock functions for testing assertions
export const mockSaveFlowState = jest.fn(() => true);
export const mockRestoreFlowState = jest.fn(() => true);
export const mockResetFlowState = jest.fn(() => true);
export const mockSetReactFlowInstance = jest.fn();

/**
 * Builds a mock PersistenceContext value for testing purposes
 * @param overrides - Optional overrides for specific methods/values
 * @returns Mock PersistenceContextType instance
 */
export function buildPersistenceContextMock(
  overrides?: Partial<PersistenceContextType>,
): PersistenceContextType {
  return {
    saveFlowState: mockSaveFlowState,
    restoreFlowState: mockRestoreFlowState,
    resetFlowState: mockResetFlowState,
    setReactFlowInstance: mockSetReactFlowInstance,
    ...overrides,
  };
}
