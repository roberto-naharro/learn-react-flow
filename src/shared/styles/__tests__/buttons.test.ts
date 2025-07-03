import { describe, expect, it } from '@jest/globals';

import { buttonStyles } from '@shared/styles/buttons';
import { theme } from '@shared/styles/theme';

describe('Button Styles', () => {
  describe('base styles', () => {
    it('should have correct base button styling properties', () => {
      expect(buttonStyles.base).toBeDefined();
      expect(buttonStyles.base.border).toBe('none');
      expect(buttonStyles.base.borderRadius).toBe(theme.borderRadius.sm);
      expect(buttonStyles.base.cursor).toBe('pointer');
      expect(buttonStyles.base.fontSize).toBe(theme.fontSize.sm);
      expect(buttonStyles.base.fontWeight).toBe(theme.fontWeight.medium);
      expect(buttonStyles.base.lineHeight).toBe(theme.lineHeight.normal);
      expect(buttonStyles.base.transition).toBe(theme.transitions.default);
      expect(buttonStyles.base.display).toBe('inline-flex');
      expect(buttonStyles.base.alignItems).toBe('center');
      expect(buttonStyles.base.justifyContent).toBe('center');
    });
  });

  describe('variant styles', () => {
    it('should have primary variant with correct colors and padding', () => {
      expect(buttonStyles.primary).toBeDefined();
      expect(buttonStyles.primary.backgroundColor).toBe(theme.colors.primary);
      expect(buttonStyles.primary.color).toBe(theme.colors.white);
      expect(buttonStyles.primary.padding).toBe(`${theme.spacing.sm} ${theme.spacing.md}`);
    });

    it('should have primary hover variant', () => {
      expect(buttonStyles.primaryHover).toBeDefined();
      expect(buttonStyles.primaryHover.backgroundColor).toBe(theme.colors.primaryHover);
    });

    it('should have secondary variant with correct colors', () => {
      expect(buttonStyles.secondary).toBeDefined();
      expect(buttonStyles.secondary.backgroundColor).toBe(theme.colors.secondary);
      expect(buttonStyles.secondary.color).toBe(theme.colors.white);
      expect(buttonStyles.secondary.padding).toBe(`${theme.spacing.sm} ${theme.spacing.md}`);
    });

    it('should have secondary hover variant', () => {
      expect(buttonStyles.secondaryHover).toBeDefined();
      expect(buttonStyles.secondaryHover.backgroundColor).toBe(theme.colors.secondaryHover);
    });

    it('should have action button variant', () => {
      expect(buttonStyles.actionButton).toBeDefined();
      expect(buttonStyles.actionButton.backgroundColor).toBe(theme.colors.actionButton);
      expect(buttonStyles.actionButton.color).toBe(theme.colors.white);
      expect(buttonStyles.actionButton.padding).toBe(`${theme.spacing.xs} ${theme.spacing.md}`);
    });

    it('should have action button hover variant', () => {
      expect(buttonStyles.actionButtonHover).toBeDefined();
      expect(buttonStyles.actionButtonHover.backgroundColor).toBe(theme.colors.actionButtonHover);
    });
  });

  describe('size variants', () => {
    it('should have small size variant', () => {
      expect(buttonStyles.small).toBeDefined();
      expect(buttonStyles.small.padding).toBe(`${theme.spacing.xs} ${theme.spacing.sm}`);
      expect(buttonStyles.small.fontSize).toBe(theme.fontSize.xs);
    });

    it('should have medium size variant', () => {
      expect(buttonStyles.medium).toBeDefined();
      expect(buttonStyles.medium.padding).toBe(`${theme.spacing.sm} ${theme.spacing.md}`);
      expect(buttonStyles.medium.fontSize).toBe(theme.fontSize.sm);
    });

    it('should have large size variant', () => {
      expect(buttonStyles.large).toBeDefined();
      expect(buttonStyles.large.padding).toBe(`${theme.spacing.md} ${theme.spacing.lg}`);
      expect(buttonStyles.large.fontSize).toBe(theme.fontSize.md);
    });
  });

  describe('style consistency', () => {
    it('should use theme values consistently', () => {
      // Verify all colors come from theme
      expect(buttonStyles.primary.backgroundColor).toBe(theme.colors.primary);
      expect(buttonStyles.secondary.backgroundColor).toBe(theme.colors.secondary);
      expect(buttonStyles.actionButton.backgroundColor).toBe(theme.colors.actionButton);

      // Verify all spacing comes from theme
      expect(buttonStyles.small.padding).toContain(theme.spacing.xs);
      expect(buttonStyles.medium.padding).toContain(theme.spacing.sm);
      expect(buttonStyles.large.padding).toContain(theme.spacing.md);
    });

    it('should have consistent base properties across variants', () => {
      // All variants should be able to merge with base styles
      expect(buttonStyles.base.cursor).toBe('pointer');
      expect(buttonStyles.base.border).toBe('none');
      expect(buttonStyles.base.borderRadius).toBe(theme.borderRadius.sm);
    });
  });
});
