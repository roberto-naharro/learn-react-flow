import { formStyles } from '@shared/styles/forms';
import { createStyles } from '@shared/styles/theme';
import { typographyStyles } from '@shared/styles/typography';

import { nodePaletteStyles } from '@domain-layer-manager/components/ControlPanel/NodePalette/NodePalette.styles';

export const sourceCustomNodePaletteStyles = createStyles(() => ({
  container: {
    ...nodePaletteStyles.nodeInnerContainer,
  },
  label: {
    ...typographyStyles.subheading,
    margin: 0,
    padding: 0,
  },
  connectionRight: {
    ...nodePaletteStyles.connectionHandleRight,
    // Position relative to button container for proper edge alignment
    position: 'absolute',
    right: '-8px', // Center handle on right edge
    top: '50%',
    transform: 'translateY(-50%)',
  },
  inputContainer: {
    width: '100%',
    marginTop: '4px',
  },
  input: {
    ...formStyles.input,
    width: '100%',
    fontSize: '12px',
    padding: '4px 8px',
    textAlign: 'center',
  },
}));
