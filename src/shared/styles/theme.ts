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
    textDark: '#000000',
    buttonBg: '#1a1a1a',
    buttonBgLight: '#f9f9f9',
    border: '#ddd',
    borderLight: '#e5e5e5',
    borderDark: '#333',
    nodeBg: '#f5f5f5',
    nodeHoverBg: '#d5d5d5',
    panelBg: 'rgba(255, 255, 255, 0.9)',
    panelShadow: 'rgba(0, 0, 0, 0.1)',
    actionsPanelBg: 'rgba(255, 255, 255, 0.8)',
    actionButton: '#3b82f6',
    actionButtonHover: '#2563eb',
    white: '#ffffff',
    black: '#000000',
    gray: {
      light: '#f8f9fa',
      medium: '#6c757d',
      dark: '#343a40',
    },
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '3.2rem',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 0 10px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '0.1s ease',
    default: '0.2s ease',
    slow: '0.3s ease',
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    tooltip: 1070,
    overlay: 1080,
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
