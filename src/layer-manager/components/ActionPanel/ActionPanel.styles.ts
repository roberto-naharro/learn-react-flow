import { createStyles } from '../../../ui/theme';
import { buttonStyles } from '../../styles/buttons';
import { panelStyles } from '../../styles/panels';

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
