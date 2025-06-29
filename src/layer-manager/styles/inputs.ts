import { createStyles } from '../../ui/theme';

export const inputStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  field: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: `1px solid ${theme.colors.border}`,
  },
}));
