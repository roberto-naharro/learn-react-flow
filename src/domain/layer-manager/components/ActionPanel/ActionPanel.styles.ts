import { buttonStyles } from '@shared/styles/buttons';
import { panelStyles } from '@shared/styles/panels';
import { createStyles } from '@shared/styles/theme';

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
        ...buttonStyles.base,
        ...buttonStyles.actionButton,
      },
    }) as const,
);
