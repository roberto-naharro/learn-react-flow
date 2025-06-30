import { createStyles } from '../../../../../shared/styles/theme';

export const nodePaletteStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
  nodeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
    padding: theme.spacing.md,
  },
  dragAndDropNode: {
    position: 'relative',
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
  dragAndDropNodeContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  connectionRight: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    right: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  connectionLeft: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.border}`,
    left: '-16px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
}));
