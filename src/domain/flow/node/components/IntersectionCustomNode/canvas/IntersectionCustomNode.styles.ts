import { nodeStyles as sharedNodeStyles } from '../../../../../../shared/styles/nodes';
import { createStyles } from '../../../../../../shared/styles/theme';
import { nodeStyles } from '../../styles';

export const intersectionCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    ...sharedNodeStyles.third,
  },
  label: {
    ...nodeStyles.label,
    color: theme.colors.white,
    textAlign: 'center',
  },
  statusLabel: {
    ...nodeStyles.statusLabel,
  },
  handleLeft: {
    top: '33%',
  },
  handleLeftBottom: {
    top: '66%',
  },
  handleRight: {
    top: '50%',
  },
  errorMessage: {
    ...nodeStyles.errorMessage,
  },
}));
