import { createStyles } from './theme';

export const typographyStyles = createStyles(
  (theme) =>
    ({
      heading: {
        fontSize: theme.fontSize.xl,
        fontWeight: theme.fontWeight.bold,
        lineHeight: theme.lineHeight.tight,
        marginBottom: theme.spacing.md,
        color: theme.colors.textLight,
      },
      subheading: {
        fontSize: theme.fontSize.lg,
        fontWeight: theme.fontWeight.semibold,
        lineHeight: theme.lineHeight.normal,
        marginBottom: theme.spacing.sm,
        color: theme.colors.textLight,
      },
      body: {
        fontSize: theme.fontSize.md,
        fontWeight: theme.fontWeight.normal,
        lineHeight: theme.lineHeight.normal,
        color: theme.colors.textLight,
      },
      bodySmall: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.normal,
        lineHeight: theme.lineHeight.normal,
        color: theme.colors.textLight,
      },
      instructions: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.normal,
        lineHeight: theme.lineHeight.relaxed,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.md,
      },
      label: {
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        lineHeight: theme.lineHeight.normal,
        marginBottom: theme.spacing.xs,
        color: theme.colors.textLight,
      },
      caption: {
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.normal,
        lineHeight: theme.lineHeight.normal,
        color: theme.colors.textMuted,
      },
    }) as const,
);
