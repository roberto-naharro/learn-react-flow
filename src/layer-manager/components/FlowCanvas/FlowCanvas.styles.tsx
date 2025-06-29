import { createStyles } from '../../../ui/theme';

export const flowCanvasStyles = createStyles(
  (theme) =>
    ({
      reactFlowWrapper: {
        width: '100%',
        height: '100%',
        background: theme.colors.backgroundLight,
      },
      reactFlowBackground: {
        background: theme.colors.backgroundLight,
      },
      dots: {
        color: theme.colors.textMuted,
        backgroundColor: theme.colors.backgroundLight,
      },
    }) as const,
);
