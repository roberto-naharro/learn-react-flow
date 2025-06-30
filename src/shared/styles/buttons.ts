import { createStyles } from './theme';

export const buttonStyles = createStyles(
  (theme) =>
    ({
      base: {
        border: 'none',
        borderRadius: theme.borderRadius.sm,
        cursor: 'pointer',
        fontSize: theme.fontSize.sm,
        fontWeight: theme.fontWeight.medium,
        lineHeight: theme.lineHeight.normal,
        transition: theme.transitions.default,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        userSelect: 'none',
      },
      primary: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      },
      primaryHover: {
        backgroundColor: theme.colors.primaryHover,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.white,
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      },
      secondaryHover: {
        backgroundColor: theme.colors.secondaryHover,
      },
      actionButton: {
        backgroundColor: theme.colors.actionButton,
        color: theme.colors.white,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
      },
      actionButtonHover: {
        backgroundColor: theme.colors.actionButtonHover,
      },
      small: {
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        fontSize: theme.fontSize.xs,
      },
      medium: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        fontSize: theme.fontSize.sm,
      },
      large: {
        padding: `${theme.spacing.md} ${theme.spacing.lg}`,
        fontSize: theme.fontSize.md,
      },
    }) as const,
);
