import { createStyles } from '../../../../../../shared/styles/theme';
import { typographyStyles } from '../../../../../../shared/styles/typography';
import { nodePaletteStyles } from '../../../../../layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

export const layerCustomNodePaletteStyles = createStyles(() => ({
  container: {
    ...nodePaletteStyles.nodeInnerContainer,
  },
  label: {
    ...typographyStyles.subheading,
    margin: 0,
    padding: 0,
  },
  connectionLeft: {
    ...nodePaletteStyles.connectionHandleLeft,
    // Position relative to the button container, not the inner div
    position: 'absolute',
    left: '-8px', // Half of the handle width to center it on the edge
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));
