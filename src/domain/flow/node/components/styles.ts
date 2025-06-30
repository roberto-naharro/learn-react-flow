import { nodeStyles as sharedNodeStyles } from '../../../../shared/styles/nodes';
import { createStyles } from '../../../../shared/styles/theme';

export const nodeStyles = createStyles(() => ({
  container: {
    ...sharedNodeStyles.base,
  },
  label: {
    ...sharedNodeStyles.label,
  },
  input: {
    ...sharedNodeStyles.input,
  },
}));
