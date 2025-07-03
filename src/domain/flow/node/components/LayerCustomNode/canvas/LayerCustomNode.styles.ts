import { nodeStyles as sharedNodeStyles } from '@shared/styles/nodes';
import { createStyles } from '@shared/styles/theme';

import { nodeStyles } from '@domain-flow/node/components/nodeComponentStyles';

export const layerCustomNodeStyles = createStyles((theme) => ({
  container: {
    ...nodeStyles.container,
    ...sharedNodeStyles.secondary,
  },
  label: {
    ...nodeStyles.label,
    color: theme.colors.white,
  },
}));
