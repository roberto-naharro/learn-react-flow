import { panelStyles } from '../../../../shared/styles/panels';
import { createStyles } from '../../../../shared/styles/theme';
import { buttonStyles } from '../../styles/buttons';

export const actionPanelStyles = createStyles(
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
        ...buttonStyles.flowControl,
        backgroundColor: theme.colors.actionButton,
      },
    }) as const,
);
