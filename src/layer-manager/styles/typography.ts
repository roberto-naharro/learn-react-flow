import { createStyles } from '../../ui/theme';

export const typographyStyles = createStyles(
  (theme) =>
    ({
      heading: {
        fontSize: theme.fontSize.xl,
        marginBottom: theme.spacing.md,
        fontWeight: 'bold',
      },
      subheading: {
        fontSize: theme.fontSize.lg,
        marginBottom: theme.spacing.sm,
        fontWeight: 'bold',
      },
      instructions: {
        fontSize: theme.fontSize.sm,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.md,
        '& p': {
          marginBottom: theme.spacing.xs,
        },
      },
    }) as const,
);
