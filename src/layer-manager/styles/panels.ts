import { createStyles } from '../../ui/theme';

// Keep only shared panel styles that might be used across multiple components
export const panelStyles = createStyles(
  (theme) =>
    ({
      base: {
        backgroundColor: theme.colors.panelBg,
        borderRadius: theme.borderRadius.md,
        boxShadow: theme.shadows.md,
      },
      smallPadding: {
        padding: theme.spacing.sm,
      },
      mediumPadding: {
        padding: theme.spacing.md,
      },
    }) as const,
);
