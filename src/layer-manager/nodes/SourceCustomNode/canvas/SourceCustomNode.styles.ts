import { createStyles } from '../../../../styles/theme';
import { nodeStyles } from '../../styles';

export const sourceCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    background: theme.colors.primary,
    border: `1px solid ${theme.colors.primaryHover}`,
  },
  label: { ...nodeStyles.label },
  input: { width: '100%' },
}));
