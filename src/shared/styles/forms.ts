import { createStyles } from './theme';

export const formStyles = createStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  inputContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  input: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border}`,
    fontSize: theme.fontSize.sm,
    lineHeight: theme.lineHeight.normal,
    transition: theme.transitions.default,
  },
  inputFocus: {
    outline: 'none',
    borderColor: theme.colors.primary,
    boxShadow: `0 0 0 2px ${theme.colors.primary}20`,
  },
  inputDisabled: {
    backgroundColor: theme.colors.gray.light,
    color: theme.colors.textMuted,
    cursor: 'not-allowed',
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    marginBottom: theme.spacing.xs,
    color: theme.colors.textLight,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  errorText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
}));
