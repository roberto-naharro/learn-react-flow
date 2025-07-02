import { nodeStyles as sharedNodeStyles } from '../../../../shared/styles/nodes';
import { createStyles } from '../../../../shared/styles/theme';

export const nodeStyles = createStyles((theme) => ({
  container: {
    ...sharedNodeStyles.base,
  },
  label: {
    ...sharedNodeStyles.label,
  },
  input: {
    ...sharedNodeStyles.input,
  },
  statusLabel: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.normal,
    textAlign: 'center',
    margin: `${theme.spacing.xs} 0`,
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray.light,
    color: theme.colors.gray.dark,
  },
  errorMessage: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.white,
    textAlign: 'center',
    margin: `${theme.spacing.xs} 0`,
    wordWrap: 'break-word',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    opacity: 0.9,
  },
}));
