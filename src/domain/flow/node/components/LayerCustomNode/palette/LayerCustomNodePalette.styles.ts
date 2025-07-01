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
    // Position relative to button container for proper edge alignment
    position: 'absolute',
    left: '-8px', // Center handle on left edge
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));
