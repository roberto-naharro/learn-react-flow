import { createStyles } from '../../../../shared/styles/theme';

export const mapViewerStyles = createStyles((theme) => ({
  mapContainer: {
    width: '100vw',
    height: '100vh',
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    zIndex: theme.zIndex.tooltip,
    pointerEvents: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: theme.colors.white,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    maxWidth: '300px',
    fontSize: theme.fontSize.xs,
  },
  tooltipContent: {
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
}));
