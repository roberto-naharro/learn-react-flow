import { createStyles } from '../../../../ui/theme';
import { nodeStyles } from '../../styles';

export const layerCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    background: theme.colors.secondary,
    border: `1px solid ${theme.colors.secondaryHover}`,
  },
  label: { ...nodeStyles.label },
}));
