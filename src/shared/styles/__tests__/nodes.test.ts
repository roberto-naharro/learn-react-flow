import { describe, expect, it } from '@jest/globals';

import { nodeStyles } from '@shared/styles/nodes';
import { theme } from '@shared/styles/theme';

describe('Node Styles', () => {
  describe('base styles', () => {
    it('should have correct base node styling properties', () => {
      expect(nodeStyles.base).toBeDefined();
      expect(nodeStyles.base.padding).toBe(theme.spacing.md);
      expect(nodeStyles.base.borderRadius).toBe(theme.borderRadius.md);
      expect(nodeStyles.base.minWidth).toBe('10em');
      expect(nodeStyles.base.minHeight).toBe('10em');
      expect(nodeStyles.base.backgroundColor).toBe(theme.colors.nodeBg);
      expect(nodeStyles.base.border).toBe(`1px solid ${theme.colors.border}`);
      expect(nodeStyles.base.transition).toBe(theme.transitions.default);
    });

    it('should have hover styles with correct background color', () => {
      expect(nodeStyles.baseHover).toBeDefined();
      expect(nodeStyles.baseHover.backgroundColor).toBe(theme.colors.nodeHoverBg);
    });
  });

  describe('label styles', () => {
    it('should have correct label styling properties', () => {
      expect(nodeStyles.label).toBeDefined();
      expect(nodeStyles.label.marginBottom).toBe(theme.spacing.sm);
      expect(nodeStyles.label.fontWeight).toBe(theme.fontWeight.semibold);
      expect(nodeStyles.label.fontSize).toBe(theme.fontSize.sm);
      expect(nodeStyles.label.color).toBe(theme.colors.textLight);
    });
  });

  describe('input styles', () => {
    it('should have correct input styling properties', () => {
      expect(nodeStyles.input).toBeDefined();
      expect(nodeStyles.input.width).toBe('100%');
      expect(nodeStyles.input.fontSize).toBe(theme.fontSize.xs);
      expect(nodeStyles.input.padding).toBe(theme.spacing.xs);
      expect(nodeStyles.input.borderRadius).toBe(theme.borderRadius.xs);
      expect(nodeStyles.input.border).toBe(`1px solid ${theme.colors.borderLight}`);
    });
  });

  describe('variant styles', () => {
    it('should have primary variant with correct colors', () => {
      expect(nodeStyles.primary).toBeDefined();
      expect(nodeStyles.primary.backgroundColor).toBe(theme.colors.primary);
      expect(nodeStyles.primary.border).toBe(`1px solid ${theme.colors.primaryHover}`);
      expect(nodeStyles.primary.color).toBe(theme.colors.white);
    });

    it('should have secondary variant with correct colors', () => {
      expect(nodeStyles.secondary).toBeDefined();
      expect(nodeStyles.secondary.backgroundColor).toBe(theme.colors.secondary);
      expect(nodeStyles.secondary.border).toBe(`1px solid ${theme.colors.secondaryHover}`);
      expect(nodeStyles.secondary.color).toBe(theme.colors.white);
    });
  });

  describe('style consistency', () => {
    it('should use theme values consistently', () => {
      // Verify all colors come from theme
      expect(nodeStyles.base.backgroundColor).toMatch(theme.colors.nodeBg);
      expect(nodeStyles.primary.backgroundColor).toMatch(theme.colors.primary);
      expect(nodeStyles.secondary.backgroundColor).toMatch(theme.colors.secondary);

      // Verify all spacing comes from theme
      expect(nodeStyles.base.padding).toMatch(theme.spacing.md);
      expect(nodeStyles.label.marginBottom).toMatch(theme.spacing.sm);
      expect(nodeStyles.input.padding).toMatch(theme.spacing.xs);
    });

    it('should have consistent border radius values', () => {
      expect(nodeStyles.base.borderRadius).toBe(theme.borderRadius.md);
      expect(nodeStyles.input.borderRadius).toBe(theme.borderRadius.xs);
    });
  });
});
