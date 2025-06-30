import { describe, expect, it } from '@jest/globals';

import { formStyles } from '../forms';
import { theme } from '../theme';

describe('Form Styles', () => {
  describe('container styles', () => {
    it('should have correct input container styling (column layout)', () => {
      expect(formStyles.inputContainer).toBeDefined();
      expect(formStyles.inputContainer.display).toBe('flex');
      expect(formStyles.inputContainer.flexDirection).toBe('column');
      expect(formStyles.inputContainer.gap).toBe(theme.spacing.sm);
      expect(formStyles.inputContainer.marginBottom).toBe(theme.spacing.sm);
    });

    it('should have correct input container row styling', () => {
      expect(formStyles.inputContainerRow).toBeDefined();
      expect(formStyles.inputContainerRow.display).toBe('flex');
      expect(formStyles.inputContainerRow.flexDirection).toBe('row');
      expect(formStyles.inputContainerRow.gap).toBe(theme.spacing.sm);
      expect(formStyles.inputContainerRow.marginBottom).toBe(theme.spacing.sm);
    });
  });

  describe('input styles', () => {
    it('should have correct base input styling', () => {
      expect(formStyles.input).toBeDefined();
      expect(formStyles.input.padding).toBe(theme.spacing.sm);
      expect(formStyles.input.borderRadius).toBe(theme.borderRadius.sm);
      expect(formStyles.input.border).toBe(`1px solid ${theme.colors.border}`);
      expect(formStyles.input.fontSize).toBe(theme.fontSize.sm);
      expect(formStyles.input.lineHeight).toBe(theme.lineHeight.normal);
      expect(formStyles.input.transition).toBe(theme.transitions.default);
    });

    it('should have focus state styles', () => {
      expect(formStyles.inputFocus).toBeDefined();
      expect(formStyles.inputFocus.outline).toBe('none');
      expect(formStyles.inputFocus.borderColor).toBe(theme.colors.primary);
      expect(formStyles.inputFocus.boxShadow).toBe(`0 0 0 2px ${theme.colors.primary}20`);
    });

    it('should have disabled state styles', () => {
      expect(formStyles.inputDisabled).toBeDefined();
      expect(formStyles.inputDisabled.backgroundColor).toBe(theme.colors.gray.light);
      expect(formStyles.inputDisabled.color).toBe(theme.colors.textMuted);
      expect(formStyles.inputDisabled.cursor).toBe('not-allowed');
    });
  });

  describe('label and text styles', () => {
    it('should have correct label styling', () => {
      expect(formStyles.label).toBeDefined();
      expect(formStyles.label.fontSize).toBe(theme.fontSize.sm);
      expect(formStyles.label.fontWeight).toBe(theme.fontWeight.medium);
      expect(formStyles.label.marginBottom).toBe(theme.spacing.xs);
      expect(formStyles.label.color).toBe(theme.colors.textLight);
    });

    it('should have error text styling', () => {
      expect(formStyles.errorText).toBeDefined();
      expect(formStyles.errorText.fontSize).toBe(theme.fontSize.xs);
      expect(formStyles.errorText.color).toBe(theme.colors.error);
      expect(formStyles.errorText.marginTop).toBe(theme.spacing.xs);
    });

    it('should have helper text styling', () => {
      expect(formStyles.helperText).toBeDefined();
      expect(formStyles.helperText.fontSize).toBe(theme.fontSize.xs);
      expect(formStyles.helperText.color).toBe(theme.colors.textMuted);
      expect(formStyles.helperText.marginTop).toBe(theme.spacing.xs);
    });
  });

  describe('field group styles', () => {
    it('should have correct field group styling', () => {
      expect(formStyles.fieldGroup).toBeDefined();
      expect(formStyles.fieldGroup.display).toBe('flex');
      expect(formStyles.fieldGroup.flexDirection).toBe('column');
      expect(formStyles.fieldGroup.gap).toBe(theme.spacing.xs);
    });
  });

  describe('style consistency', () => {
    it('should use theme values consistently', () => {
      // Verify all colors come from theme
      expect(formStyles.input.border).toContain(theme.colors.border);
      expect(formStyles.inputFocus.borderColor).toBe(theme.colors.primary);
      expect(formStyles.label.color).toBe(theme.colors.textLight);
      expect(formStyles.errorText.color).toBe(theme.colors.error);

      // Verify all spacing comes from theme
      expect(formStyles.input.padding).toBe(theme.spacing.sm);
      expect(formStyles.label.marginBottom).toBe(theme.spacing.xs);
      expect(formStyles.inputContainer.gap).toBe(theme.spacing.sm);
    });

    it('should have consistent font sizing', () => {
      expect(formStyles.input.fontSize).toBe(theme.fontSize.sm);
      expect(formStyles.label.fontSize).toBe(theme.fontSize.sm);
      expect(formStyles.errorText.fontSize).toBe(theme.fontSize.xs);
      expect(formStyles.helperText.fontSize).toBe(theme.fontSize.xs);
    });
  });
});
