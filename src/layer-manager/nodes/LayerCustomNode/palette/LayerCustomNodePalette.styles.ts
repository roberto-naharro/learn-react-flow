import { createStyles } from '../../../../ui/theme';
import { nodePaletteStyles } from '../../../components/ControlPanel/NodePalette/NodePalette.styles';
import { typographyStyles } from '../../../styles/typography';

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
