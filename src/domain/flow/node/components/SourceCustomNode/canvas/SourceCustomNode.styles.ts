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
}));
