import { buttonStyles as globalButtonStyles } from '../../styles/buttons';
import { createStyles } from '../../styles/theme';

export const buttonStyles = createStyles(
  (theme) =>
    ({
      button: {
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        borderRadius: theme.borderRadius.md,
        border: '1px solid transparent',
        backgroundColor: theme.colors.buttonBg,
        color: theme.colors.text,
        fontSize: theme.fontSize.md,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'border-color 0.25s',
      },
      flowControl: {
        ...globalButtonStyles.actionButton,
      },
    }) as const,
);
