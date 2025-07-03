import { describe, expect, it } from '@jest/globals';

import { createStyles, theme } from '@shared/styles/theme';

describe('Theme and createStyles', () => {
  it('should export theme object', () => {
    expect(theme).toBeDefined();
    expect(theme.colors).toBeDefined();
    expect(theme.spacing).toBeDefined();
  });

  it('should apply createStyles correctly', () => {
    const styles = createStyles((t) => ({
      foo: { color: t.colors.primary },
    }));
    expect(styles.foo.color).toBe(theme.colors.primary);
  });
});
