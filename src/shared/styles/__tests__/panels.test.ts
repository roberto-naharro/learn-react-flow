import { describe, expect, it } from '@jest/globals';

import { panelStyles } from '@shared/styles/panels';

describe('General panelStyles', () => {
  it('should export base, smallPadding, and mediumPadding styles', () => {
    expect(panelStyles.base).toBeDefined();
    expect(panelStyles.smallPadding).toBeDefined();
    expect(panelStyles.mediumPadding).toBeDefined();
  });
});
