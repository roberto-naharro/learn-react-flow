import { describe, expect, it } from '@jest/globals';

import { typographyStyles } from '@shared/styles/typography';

describe('General typographyStyles', () => {
  it('should export heading, subheading, and instructions styles', () => {
    expect(typographyStyles.heading).toBeDefined();
    expect(typographyStyles.subheading).toBeDefined();
    expect(typographyStyles.instructions).toBeDefined();
  });
});
