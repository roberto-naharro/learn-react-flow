import { jest } from '@jest/globals';

// Mock localStorage
export const localStorageMock = (() => {
  let store: Record<string, string> = {};
  const out = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    _clearAllMocks: () => undefined,
  };

  out._clearAllMocks = () => {
    out.getItem.mockClear();
    out.setItem.mockClear();
    out.clear.mockClear();
    store = {};
  };

  return out;
})();
