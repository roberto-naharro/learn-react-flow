/**
 * Basic theme values that can be reused across the application
 */
export const theme = {
  colors: {
    primary: '#646cff',
    primaryHover: '#535bf2',
    background: '#242424',
    backgroundLight: '#ffffff',
    text: 'rgba(255, 255, 255, 0.87)',
    textLight: '#213547',
    buttonBg: '#1a1a1a',
    buttonBgLight: '#f9f9f9',
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
  },
  fontSize: {
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '3.2rem',
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
