import type { CSSProperties } from 'react';

import { describe, expect, it, jest } from '@jest/globals';

import {
  createFocusHandlers,
  createHoverHandlers,
  mergeFocusStyles,
  mergeHoverStyles,
} from '../utils';

describe('Style Utilities', () => {
  describe('mergeHoverStyles', () => {
    const baseStyles: CSSProperties = {
      backgroundColor: 'blue',
      color: 'white',
      padding: '8px',
    };

    const hoverStyles: CSSProperties = {
      backgroundColor: 'darkblue',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    it('should return only base styles when not hovered', () => {
      const result = mergeHoverStyles(baseStyles, hoverStyles, false);

      expect(result).toEqual(baseStyles);
      expect(result.backgroundColor).toBe('blue');
      expect(result.boxShadow).toBeUndefined();
    });

    it('should merge base and hover styles when hovered', () => {
      const result = mergeHoverStyles(baseStyles, hoverStyles, true);

      expect(result.backgroundColor).toBe('darkblue');
      expect(result.color).toBe('white');
      expect(result.padding).toBe('8px');
      expect(result.boxShadow).toBe('0 2px 4px rgba(0,0,0,0.1)');
    });

    it('should handle empty hover styles', () => {
      const result = mergeHoverStyles(baseStyles, {}, true);

      expect(result).toEqual(baseStyles);
    });

    it('should handle empty base styles', () => {
      const result = mergeHoverStyles({}, hoverStyles, true);

      expect(result).toEqual(hoverStyles);
    });
  });

  describe('mergeFocusStyles', () => {
    const baseStyles: CSSProperties = {
      border: '1px solid gray',
      outline: 'none',
    };

    const focusStyles: CSSProperties = {
      border: '1px solid blue',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)',
    };

    it('should return only base styles when not focused', () => {
      const result = mergeFocusStyles(baseStyles, focusStyles, false);

      expect(result).toEqual(baseStyles);
      expect(result.border).toBe('1px solid gray');
      expect(result.boxShadow).toBeUndefined();
    });

    it('should merge base and focus styles when focused', () => {
      const result = mergeFocusStyles(baseStyles, focusStyles, true);

      expect(result.border).toBe('1px solid blue');
      expect(result.outline).toBe('none');
      expect(result.boxShadow).toBe('0 0 0 2px rgba(0,123,255,0.25)');
    });

    it('should handle empty focus styles', () => {
      const result = mergeFocusStyles(baseStyles, {}, true);

      expect(result).toEqual(baseStyles);
    });
  });

  describe('createHoverHandlers', () => {
    it('should return correct hover handlers and state', () => {
      const mockSetIsHovered = jest.fn();
      const isHovered = false;

      const handlers = createHoverHandlers(isHovered, mockSetIsHovered);

      expect(handlers.isHovered).toBe(false);
      expect(typeof handlers.onMouseEnter).toBe('function');
      expect(typeof handlers.onMouseLeave).toBe('function');
    });

    it('should call setIsHovered(true) on mouse enter', () => {
      const mockSetIsHovered = jest.fn();
      const isHovered = false;

      const handlers = createHoverHandlers(isHovered, mockSetIsHovered);
      handlers.onMouseEnter();

      expect(mockSetIsHovered).toHaveBeenCalledWith(true);
      expect(mockSetIsHovered).toHaveBeenCalledTimes(1);
    });

    it('should call setIsHovered(false) on mouse leave', () => {
      const mockSetIsHovered = jest.fn();
      const isHovered = true;

      const handlers = createHoverHandlers(isHovered, mockSetIsHovered);
      handlers.onMouseLeave();

      expect(mockSetIsHovered).toHaveBeenCalledWith(false);
      expect(mockSetIsHovered).toHaveBeenCalledTimes(1);
    });

    it('should return current hover state', () => {
      const mockSetIsHovered = jest.fn();

      const handlersNotHovered = createHoverHandlers(false, mockSetIsHovered);
      expect(handlersNotHovered.isHovered).toBe(false);

      const handlersHovered = createHoverHandlers(true, mockSetIsHovered);
      expect(handlersHovered.isHovered).toBe(true);
    });
  });

  describe('createFocusHandlers', () => {
    it('should return correct focus handlers and state', () => {
      const mockSetIsFocused = jest.fn();
      const isFocused = false;

      const handlers = createFocusHandlers(isFocused, mockSetIsFocused);

      expect(handlers.isFocused).toBe(false);
      expect(typeof handlers.onFocus).toBe('function');
      expect(typeof handlers.onBlur).toBe('function');
    });

    it('should call setIsFocused(true) on focus', () => {
      const mockSetIsFocused = jest.fn();
      const isFocused = false;

      const handlers = createFocusHandlers(isFocused, mockSetIsFocused);
      handlers.onFocus();

      expect(mockSetIsFocused).toHaveBeenCalledWith(true);
      expect(mockSetIsFocused).toHaveBeenCalledTimes(1);
    });

    it('should call setIsFocused(false) on blur', () => {
      const mockSetIsFocused = jest.fn();
      const isFocused = true;

      const handlers = createFocusHandlers(isFocused, mockSetIsFocused);
      handlers.onBlur();

      expect(mockSetIsFocused).toHaveBeenCalledWith(false);
      expect(mockSetIsFocused).toHaveBeenCalledTimes(1);
    });

    it('should return current focus state', () => {
      const mockSetIsFocused = jest.fn();

      const handlersNotFocused = createFocusHandlers(false, mockSetIsFocused);
      expect(handlersNotFocused.isFocused).toBe(false);

      const handlersFocused = createFocusHandlers(true, mockSetIsFocused);
      expect(handlersFocused.isFocused).toBe(true);
    });
  });

  describe('integration tests', () => {
    it('should work together for hover state management', () => {
      const baseStyles: CSSProperties = { backgroundColor: 'white' };
      const hoverStyles: CSSProperties = { backgroundColor: 'gray' };
      const mockSetIsHovered = jest.fn();

      // Simulate component not hovered
      let isHovered = false;
      const handlers = createHoverHandlers(isHovered, mockSetIsHovered);
      const styles = mergeHoverStyles(baseStyles, hoverStyles, handlers.isHovered);

      expect(styles.backgroundColor).toBe('white');

      // Simulate mouse enter
      handlers.onMouseEnter();
      expect(mockSetIsHovered).toHaveBeenCalledWith(true);

      // Simulate component now hovered (after state update)
      isHovered = true;
      const handlersHovered = createHoverHandlers(isHovered, mockSetIsHovered);
      const stylesHovered = mergeHoverStyles(baseStyles, hoverStyles, handlersHovered.isHovered);

      expect(stylesHovered.backgroundColor).toBe('gray');
    });

    it('should work together for focus state management', () => {
      const baseStyles: CSSProperties = { border: '1px solid gray' };
      const focusStyles: CSSProperties = { border: '1px solid blue' };
      const mockSetIsFocused = jest.fn();

      // Simulate component not focused
      let isFocused = false;
      const handlers = createFocusHandlers(isFocused, mockSetIsFocused);
      const styles = mergeFocusStyles(baseStyles, focusStyles, handlers.isFocused);

      expect(styles.border).toBe('1px solid gray');

      // Simulate focus
      handlers.onFocus();
      expect(mockSetIsFocused).toHaveBeenCalledWith(true);

      // Simulate component now focused (after state update)
      isFocused = true;
      const handlersFocused = createFocusHandlers(isFocused, mockSetIsFocused);
      const stylesFocused = mergeFocusStyles(baseStyles, focusStyles, handlersFocused.isFocused);

      expect(stylesFocused.border).toBe('1px solid blue');
    });
  });
});
