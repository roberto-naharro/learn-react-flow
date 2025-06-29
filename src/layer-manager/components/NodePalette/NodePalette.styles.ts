import { createStyles } from '../../../ui/theme';

export const nodePaletteStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
  nodeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  dragAndDropNode: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.nodeBg,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: theme.spacing.xs,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab',
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.md,
    textAlign: 'center',
    width: '100%',
  },
}));
