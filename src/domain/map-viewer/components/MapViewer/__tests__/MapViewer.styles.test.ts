import { describe, expect, it } from '@jest/globals';

import { theme } from '../../../../../shared/styles/theme';
import { mapViewerStyles } from '../MapViewer.styles';

describe('MapViewer Styles', () => {
  describe('map container styles', () => {
    it('should have correct map container styling', () => {
      expect(mapViewerStyles.mapContainer).toBeDefined();
      expect(mapViewerStyles.mapContainer.width).toBe('100vw');
      expect(mapViewerStyles.mapContainer.height).toBe('100vh');
      expect(mapViewerStyles.mapContainer.position).toBe('relative');
    });
  });

  describe('tooltip styles', () => {
    it('should have correct tooltip styling', () => {
      expect(mapViewerStyles.tooltip).toBeDefined();
      expect(mapViewerStyles.tooltip.position).toBe('absolute');
      expect(mapViewerStyles.tooltip.zIndex).toBe(theme.zIndex.tooltip);
      expect(mapViewerStyles.tooltip.pointerEvents).toBe('none');
      expect(mapViewerStyles.tooltip.backgroundColor).toBe('rgba(0, 0, 0, 0.8)');
      expect(mapViewerStyles.tooltip.color).toBe(theme.colors.white);
      expect(mapViewerStyles.tooltip.padding).toBe(theme.spacing.sm);
      expect(mapViewerStyles.tooltip.borderRadius).toBe(theme.borderRadius.sm);
      expect(mapViewerStyles.tooltip.maxWidth).toBe('300px');
      expect(mapViewerStyles.tooltip.fontSize).toBe(theme.fontSize.xs);
    });

    it('should have correct tooltip content styling', () => {
      expect(mapViewerStyles.tooltipContent).toBeDefined();
      expect(mapViewerStyles.tooltipContent.margin).toBe(0);
      expect(mapViewerStyles.tooltipContent.whiteSpace).toBe('pre-wrap');
    });
  });

  describe('style consistency', () => {
    it('should use theme values consistently', () => {
      // Verify z-index comes from theme
      expect(mapViewerStyles.tooltip.zIndex).toBe(theme.zIndex.tooltip);

      // Verify colors come from theme
      expect(mapViewerStyles.tooltip.color).toBe(theme.colors.white);

      // Verify spacing comes from theme
      expect(mapViewerStyles.tooltip.padding).toBe(theme.spacing.sm);

      // Verify border radius comes from theme
      expect(mapViewerStyles.tooltip.borderRadius).toBe(theme.borderRadius.sm);

      // Verify font size comes from theme
      expect(mapViewerStyles.tooltip.fontSize).toBe(theme.fontSize.xs);
    });

    it('should have proper tooltip positioning properties', () => {
      expect(mapViewerStyles.tooltip.position).toBe('absolute');
      expect(mapViewerStyles.tooltip.pointerEvents).toBe('none');
      expect(mapViewerStyles.tooltip.zIndex).toBeGreaterThan(1000);
    });

    it('should have proper full viewport dimensions for map container', () => {
      expect(mapViewerStyles.mapContainer.width).toBe('100vw');
      expect(mapViewerStyles.mapContainer.height).toBe('100vh');
      expect(mapViewerStyles.mapContainer.position).toBe('relative');
    });
  });

  describe('accessibility and usability', () => {
    it('should have tooltip styles that ensure readability', () => {
      // High contrast background for readability
      expect(mapViewerStyles.tooltip.backgroundColor).toBe('rgba(0, 0, 0, 0.8)');
      expect(mapViewerStyles.tooltip.color).toBe(theme.colors.white);

      // Pointer events disabled to prevent interference with map interaction
      expect(mapViewerStyles.tooltip.pointerEvents).toBe('none');

      // Max width to prevent overly wide tooltips
      expect(mapViewerStyles.tooltip.maxWidth).toBe('300px');
    });

    it('should have appropriate text formatting for tooltip content', () => {
      // Pre-wrap to preserve JSON formatting
      expect(mapViewerStyles.tooltipContent.whiteSpace).toBe('pre-wrap');

      // No margin to keep content compact
      expect(mapViewerStyles.tooltipContent.margin).toBe(0);
    });
  });
});
