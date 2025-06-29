import { createStyles } from '../../ui/theme';

export const buttonStyles = createStyles(
  (theme) =>
    ({
      button: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        borderRadius: theme.borderRadius.md,
        border: '1px solid transparent',
        backgroundColor: theme.colors.buttonBg,
        color: theme.colors.text,
        fontSize: theme.fontSize.md,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.25s',
      },
      flowControl: {
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
