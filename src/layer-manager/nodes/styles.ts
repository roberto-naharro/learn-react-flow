import { createStyles } from '../../styles/theme';

export const nodeStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.md,
    borderRadius: 6,
    minWidth: '10em',
    minHeight: '10em',
  },
  label: { marginBottom: theme.spacing.sm, fontWeight: 600 },
}));
