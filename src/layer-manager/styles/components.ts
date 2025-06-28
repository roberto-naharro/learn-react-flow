import { createStyles } from '../../ui/theme';

export const controlPanelStyles = createStyles((theme) => ({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  inputContainer: {
    display: 'flex',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  input: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    border: '1px solid #ccc',
  },
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
  title: {
    fontSize: theme.fontSize.xl,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
}));
