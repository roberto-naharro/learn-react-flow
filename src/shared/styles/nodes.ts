import { createStyles } from './theme';

export const nodeStyles = createStyles((theme) => ({
  base: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: '10em',
    minHeight: '10em',
    backgroundColor: theme.colors.nodeBg,
    border: `1px solid ${theme.colors.border}`,
    transition: theme.transitions.default,
  },
  baseHover: {
    backgroundColor: theme.colors.nodeHoverBg,
  },
  label: {
    marginBottom: theme.spacing.sm,
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textLight,
  },
  input: {
    width: '100%',
    fontSize: theme.fontSize.xs,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
    border: `1px solid ${theme.colors.borderLight}`,
    '&:focus': {
      outline: 'none',
      borderColor: theme.colors.primary,
    },
  },
  primary: {
    backgroundColor: theme.colors.primary,
    border: `1px solid ${theme.colors.primaryHover}`,
    color: theme.colors.white,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    border: `1px solid ${theme.colors.secondaryHover}`,
    color: theme.colors.white,
  },
}));
