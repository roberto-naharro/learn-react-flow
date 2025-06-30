import { describe, expect, it } from '@jest/globals';

import { buttonStyles } from '../buttons';

describe('General buttonStyles', () => {
  it('should export actionButton style', () => {
    expect(buttonStyles.actionButton).toBeDefined();
    expect(buttonStyles.actionButton.backgroundColor).toBeDefined();
    expect(buttonStyles.actionButton.color).toBeDefined();
  });
});
