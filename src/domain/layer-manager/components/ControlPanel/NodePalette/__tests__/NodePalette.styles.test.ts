import { describe, expect, it } from '@jest/globals';

import { theme } from '@shared/styles/theme';

import { nodePaletteStyles } from '@domain-layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

describe('NodePalette Styles', () => {
  describe('container styles', () => {
    it('should have correct palette container styling', () => {
      expect(nodePaletteStyles.paletteContainer).toBeDefined();
      expect(nodePaletteStyles.paletteContainer.marginBottom).toBe(theme.spacing.md);
    });

    it('should have correct node types list styling', () => {
      expect(nodePaletteStyles.nodeTypesList).toBeDefined();
      expect(nodePaletteStyles.nodeTypesList.display).toBe('flex');
      expect(nodePaletteStyles.nodeTypesList.flexDirection).toBe('column');
      expect(nodePaletteStyles.nodeTypesList.gap).toBe(theme.spacing.xl);
      expect(nodePaletteStyles.nodeTypesList.padding).toBe(theme.spacing.md);
    });

    it('should have correct palette node types container styling', () => {
      expect(nodePaletteStyles.paletteNodeTypesContainer).toBeDefined();
      expect(nodePaletteStyles.paletteNodeTypesContainer.width).toBe('100%');
      expect(nodePaletteStyles.paletteNodeTypesContainer.height).toBe('100%');
      expect(nodePaletteStyles.paletteNodeTypesContainer.display).toBe('flex');
      expect(nodePaletteStyles.paletteNodeTypesContainer.flexDirection).toBe('column');
      expect(nodePaletteStyles.paletteNodeTypesContainer.gap).toBe(theme.spacing.md);
    });
  });

  describe('palette node styles', () => {
    it('should have correct base palette node styling', () => {
      expect(nodePaletteStyles.paletteNode).toBeDefined();
      expect(nodePaletteStyles.paletteNode.position).toBe('relative');
      expect(nodePaletteStyles.paletteNode.padding).toBe(theme.spacing.md);
      expect(nodePaletteStyles.paletteNode.borderRadius).toBe(theme.borderRadius.sm);
      expect(nodePaletteStyles.paletteNode.backgroundColor).toBe(theme.colors.nodeBg);
      expect(nodePaletteStyles.paletteNode.border).toBe(`1px solid ${theme.colors.border}`);
      expect(nodePaletteStyles.paletteNode.marginBottom).toBe(theme.spacing.xs);
      expect(nodePaletteStyles.paletteNode.display).toBe('flex');
      expect(nodePaletteStyles.paletteNode.justifyContent).toBe('center');
      expect(nodePaletteStyles.paletteNode.alignItems).toBe('center');
      expect(nodePaletteStyles.paletteNode.cursor).toBe('grab');
      expect(nodePaletteStyles.paletteNode.color).toBe(theme.colors.textMuted);
      expect(nodePaletteStyles.paletteNode.fontSize).toBe(theme.fontSize.md);
      expect(nodePaletteStyles.paletteNode.textAlign).toBe('center');
      expect(nodePaletteStyles.paletteNode.width).toBe('100%');
      expect(nodePaletteStyles.paletteNode.transition).toBe(theme.transitions.default);
    });

    it('should have hover state styling', () => {
      expect(nodePaletteStyles.paletteNodeHover).toBeDefined();
      expect(nodePaletteStyles.paletteNodeHover.backgroundColor).toBe(theme.colors.nodeHoverBg);
      expect(nodePaletteStyles.paletteNodeHover.borderColor).toBe(theme.colors.primary);
    });
  });

  describe('connection handle styles', () => {
    it('should have correct right connection handle styling', () => {
      expect(nodePaletteStyles.connectionHandleRight).toBeDefined();
      expect(nodePaletteStyles.connectionHandleRight.position).toBe('absolute');
      expect(nodePaletteStyles.connectionHandleRight.width).toBe(theme.spacing.md);
      expect(nodePaletteStyles.connectionHandleRight.height).toBe(theme.spacing.md);
      expect(nodePaletteStyles.connectionHandleRight.borderRadius).toBe(theme.borderRadius.round);
      expect(nodePaletteStyles.connectionHandleRight.backgroundColor).toBe(theme.colors.white);
      expect(nodePaletteStyles.connectionHandleRight.border).toBe(
        `1px solid ${theme.colors.border}`,
      );
      expect(nodePaletteStyles.connectionHandleRight.right).toBe(`-${theme.spacing.md}`);
      expect(nodePaletteStyles.connectionHandleRight.top).toBe('50%');
      expect(nodePaletteStyles.connectionHandleRight.transform).toBe('translateY(-50%)');
    });

    it('should have correct left connection handle styling', () => {
      expect(nodePaletteStyles.connectionHandleLeft).toBeDefined();
      expect(nodePaletteStyles.connectionHandleLeft.position).toBe('absolute');
      expect(nodePaletteStyles.connectionHandleLeft.width).toBe(theme.spacing.md);
      expect(nodePaletteStyles.connectionHandleLeft.height).toBe(theme.spacing.md);
      expect(nodePaletteStyles.connectionHandleLeft.borderRadius).toBe(theme.borderRadius.round);
      expect(nodePaletteStyles.connectionHandleLeft.backgroundColor).toBe(theme.colors.white);
      expect(nodePaletteStyles.connectionHandleLeft.border).toBe(
        `1px solid ${theme.colors.border}`,
      );
      expect(nodePaletteStyles.connectionHandleLeft.left).toBe(`-${theme.spacing.md}`);
      expect(nodePaletteStyles.connectionHandleLeft.top).toBe('50%');
      expect(nodePaletteStyles.connectionHandleLeft.transform).toBe('translateY(-50%)');
    });
  });

  describe('style consistency', () => {
    it('should use theme values consistently', () => {
      // Verify all colors come from theme
      expect(nodePaletteStyles.paletteNode.backgroundColor).toBe(theme.colors.nodeBg);
      expect(nodePaletteStyles.paletteNodeHover.backgroundColor).toBe(theme.colors.nodeHoverBg);
      expect(nodePaletteStyles.connectionHandleRight.backgroundColor).toBe(theme.colors.white);

      // Verify all spacing comes from theme
      expect(nodePaletteStyles.paletteNode.padding).toBe(theme.spacing.md);
      expect(nodePaletteStyles.nodeTypesList.gap).toBe(theme.spacing.xl);
      expect(nodePaletteStyles.paletteContainer.marginBottom).toBe(theme.spacing.md);
    });

    it('should have consistent border styling', () => {
      expect(nodePaletteStyles.paletteNode.border).toContain(theme.colors.border);
      expect(nodePaletteStyles.connectionHandleRight.border).toContain(theme.colors.border);
      expect(nodePaletteStyles.connectionHandleLeft.border).toContain(theme.colors.border);
    });

    it('should have consistent connection handle dimensions', () => {
      const rightHandle = nodePaletteStyles.connectionHandleRight;
      const leftHandle = nodePaletteStyles.connectionHandleLeft;

      expect(rightHandle.width).toBe(leftHandle.width);
      expect(rightHandle.height).toBe(leftHandle.height);
      expect(rightHandle.borderRadius).toBe(leftHandle.borderRadius);
      expect(rightHandle.backgroundColor).toBe(leftHandle.backgroundColor);
      expect(rightHandle.border).toBe(leftHandle.border);
    });
  });
});
