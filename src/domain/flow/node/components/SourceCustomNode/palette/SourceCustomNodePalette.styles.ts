import { createStyles } from '../../../../../../shared/styles/theme';
import { typographyStyles } from '../../../../../../shared/styles/typography';
import { nodePaletteStyles } from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

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
