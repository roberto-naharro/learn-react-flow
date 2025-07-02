import { nodeStyles as sharedNodeStyles } from '../../../../../../shared/styles/nodes';
import { createStyles } from '../../../../../../shared/styles/theme';
import { nodeStyles } from '../../nodeComponentStyles';

export const sourceCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    ...sharedNodeStyles.primary,
  },
  label: {
    ...nodeStyles.label,
    color: theme.colors.white,
  },
  statusLabel: {
    ...nodeStyles.statusLabel,
  },
  input: {
    ...nodeStyles.input,
  },
  errorMessage: {
    ...nodeStyles.errorMessage,
  },
}));
