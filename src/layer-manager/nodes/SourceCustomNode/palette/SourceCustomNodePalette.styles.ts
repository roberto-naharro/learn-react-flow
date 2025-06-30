import { createStyles } from '../../../../styles/theme';
import { typographyStyles } from '../../../../styles/typography';
import { nodePaletteStyles } from '../../../components/ControlPanel/NodePalette/NodePalette.styles';

export const sourceCustomNodePaletteStyles = createStyles(() => ({
  container: {
    ...nodePaletteStyles.dragAndDropNodeContainer,
  },
  label: {
    ...typographyStyles.subheading,
  },
  connectionRight: {
    ...nodePaletteStyles.connectionRight,
  },
}));
