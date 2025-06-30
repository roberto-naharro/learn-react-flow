import { createStyles } from './theme';

export const formStyles = createStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  input: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border}`,
  },
}));
