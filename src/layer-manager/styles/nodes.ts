import { createStyles } from '../../styles/theme';

export const nodeStyles = createStyles(
  (theme) =>
    ({
      dragAndDropNode: {
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.sm,
        margin: `${theme.spacing.xs} 0`,
        backgroundColor: theme.colors.nodeBg,
        border: `1px solid ${theme.colors.border}`,
        display: 'block',
        width: '100%',
        textAlign: 'left',
        cursor: 'grab',
        transition: `background-color ${theme.transitions.default}`,
        userSelect: 'none',
        fontSize: theme.fontSize.md,
      },
    }) as const,
);
