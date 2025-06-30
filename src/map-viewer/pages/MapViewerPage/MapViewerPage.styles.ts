import { buttonStyles } from '../../../styles/buttons';
import { panelStyles } from '../../../styles/panels';
import { createStyles } from '../../../styles/theme';

export const mapViewerPageStyles = createStyles(
  (theme) =>
    ({
      container: {
        ...panelStyles.base,
        ...panelStyles.smallPadding,
        display: 'flex',
        gap: theme.spacing.sm,
        backgroundColor: theme.colors.actionsPanelBg,
      },
      button: {
        ...buttonStyles.actionButton,
        backgroundColor: theme.colors.actionButton,
      },
    }) as const,
);
