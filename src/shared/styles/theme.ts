/**
 * Basic theme values that can be reused across the application
 */
export const theme = {
  colors: {
    primary: '#999eff',
    primaryHover: '#5962ff',
    secondary: '#ffa9d4',
    secondaryHover: '#ff54aa',
    background: '#242424',
    backgroundLight: '#ffffff',
    text: 'rgba(255, 255, 255, 0.87)',
    textLight: '#213547',
    textMuted: 'rgba(0, 0, 0, 0.6)',
    buttonBg: '#1a1a1a',
    buttonBgLight: '#f9f9f9',
    border: '#ddd',
    nodeBg: '#f5f5f5',
    nodeHoverBg: '#d5d5d5', // Added for node hover state
    panelBg: 'rgba(255, 255, 255, 0.9)',
    panelShadow: 'rgba(0, 0, 0, 0.1)',
    actionsPanelBg: 'rgba(255, 255, 255, 0.8)',
    actionButton: '#3b82f6', // Added for action buttons
    actionButtonHover: '#2563eb', // Added for action button hover state
    white: '#ffffff', // Added for white text
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '3.2rem',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 0 10px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: '0.2s ease',
  },
};

export type Theme = typeof theme;

/**
 * Creates a styles object by applying the provided style function to the current theme.
 *
 * @typeParam T - Type of the styles object, where keys are strings and values are React CSS properties
 * @param  stylesFunc - A function that takes a theme object and returns styles
 * @returns The resulting styles object after applying the theme
 *
 * @example
 * const styles = createStyles((theme) => ({
 *   container: {
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.medium
 *   }
 * }));
 */
export const createStyles = <T extends Record<string, React.CSSProperties>>(
  stylesFunc: (theme: Theme) => T,
): T => stylesFunc(theme);
