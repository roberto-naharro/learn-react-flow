import { createStyles } from '../../../../../../shared/styles/theme';
import { typographyStyles } from '../../../../../../shared/styles/typography';
import { nodePaletteStyles } from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

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
