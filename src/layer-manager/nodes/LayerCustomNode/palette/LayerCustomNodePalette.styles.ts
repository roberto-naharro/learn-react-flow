import { createStyles } from '../../../../styles/theme';
import { typographyStyles } from '../../../../styles/typography';
import { nodePaletteStyles } from '../../../components/ControlPanel/NodePalette/NodePalette.styles';

export const layerCustomNodePaletteStyles = createStyles(() => ({
  container: {
    ...nodePaletteStyles.dragAndDropNodeContainer,
  },
  label: {
    ...typographyStyles.subheading,
  },
  connectionLeft: {
    ...nodePaletteStyles.connectionLeft,
  },
}));
