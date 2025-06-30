import type { CSSProperties } from 'react';

/**
 * Utility function to merge base styles with hover styles based on hover state
 *
 * @param baseStyles - The base styles object
 * @param hoverStyles - The hover styles object
 * @param isHovered - Whether the component is currently hovered
 * @returns Combined styles object
 */
export const mergeHoverStyles = (
  baseStyles: CSSProperties,
  hoverStyles: CSSProperties,
  isHovered: boolean,
): CSSProperties => ({
  ...baseStyles,
  ...(isHovered ? hoverStyles : {}),
});

/**
 * Utility function to merge base styles with focus styles based on focus state
 *
 * @param baseStyles - The base styles object
 * @param focusStyles - The focus styles object
 * @param isFocused - Whether the component is currently focused
 * @returns Combined styles object
 */
export const mergeFocusStyles = (
  baseStyles: CSSProperties,
  focusStyles: CSSProperties,
  isFocused: boolean,
): CSSProperties => ({
  ...baseStyles,
  ...(isFocused ? focusStyles : {}),
});

/**
 * Hook-like utility to manage hover state
 * Returns hover handlers and current hover state
 */
export const createHoverHandlers = (
  isHovered: boolean,
  setIsHovered: (hovered: boolean) => void,
) => ({
  onMouseEnter: () => setIsHovered(true),
  onMouseLeave: () => setIsHovered(false),
  isHovered,
});

/**
 * Hook-like utility to manage focus state
 * Returns focus handlers and current focus state
 */
export const createFocusHandlers = (
  isFocused: boolean,
  setIsFocused: (focused: boolean) => void,
) => ({
  onFocus: () => setIsFocused(true),
  onBlur: () => setIsFocused(false),
  isFocused,
});
