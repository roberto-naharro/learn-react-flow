import { describe, expect, it } from '@jest/globals';

import { formStyles } from '../forms';

describe('General formStyles', () => {
  it('should export inputContainer and input styles', () => {
    expect(formStyles.inputContainer).toBeDefined();
    expect(formStyles.input).toBeDefined();
  });
});
