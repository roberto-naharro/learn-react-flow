import { createStyles } from '@shared/styles/theme';
import { typographyStyles } from '@shared/styles/typography';

import { nodePaletteStyles } from '@domain-layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

export const intersectionCustomNodePaletteStyles = createStyles(() => ({
  container: {
    ...nodePaletteStyles.nodeInnerContainer,
  },
  label: {
    ...typographyStyles.subheading,
    margin: 0,
    padding: 0,
  },
  connectionLeftTop: {
    ...nodePaletteStyles.connectionHandleLeft,
    // Position relative to button container for proper edge alignment
    position: 'absolute',
    left: '-8px', // Center handle on left edge
    top: '33%',
    transform: 'translateY(-50%)',
  },
  connectionLeftBottom: {
    ...nodePaletteStyles.connectionHandleLeft,
    // Position relative to button container for proper edge alignment
    position: 'absolute',
    left: '-8px', // Center handle on left edge
    top: '66%',
    transform: 'translateY(-50%)',
  },
  connectionRight: {
    ...nodePaletteStyles.connectionHandleRight,
    // Position relative to button container for proper edge alignment
    position: 'absolute',
    right: '-8px', // Center handle on right edge
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));
