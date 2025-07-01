import { nodeStyles as sharedNodeStyles } from '../../../../../../shared/styles/nodes';
import { createStyles } from '../../../../../../shared/styles/theme';
import { nodeStyles } from '../../styles';

export const sourceCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    ...sharedNodeStyles.primary,
  },
  label: {
    ...nodeStyles.label,
    color: theme.colors.white,
  },
  input: {
    ...nodeStyles.input,
  },
  error: {
    color: theme.colors.error,
    fontSize: '12px',
    marginTop: '4px',
  },
  success: {
    color: theme.colors.success,
    fontSize: '12px',
    marginTop: '4px',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginTop: theme.spacing.xs,
  },
}));
