import { jest } from '@jest/globals';

export const requestAnimationFrameMock = jest.fn((callback: FrameRequestCallback) => {
  callback(0);
  return 0;
});
