import { createStyles } from './theme';

export const buttonStyles = createStyles(
  (theme) =>
    ({
      actionButton: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.text,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.borderRadius.sm,
        border: 'none',
        cursor: 'pointer',
        fontSize: theme.fontSize.sm,
        fontWeight: 500,
        transition: theme.transitions.default,
      },
    }) as const,
);
