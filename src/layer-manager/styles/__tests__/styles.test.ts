import { describe, expect, it } from '@jest/globals';

import * as styles from '../index';

describe('Style exports', () => {
  it('should export all style modules correctly', () => {
    // Check that all styles are exported
    expect(styles).toBeDefined();

    // Check for specific style exports to ensure everything is included
    expect(styles.buttonStyles).toBeDefined();
    expect(styles.inputStyles).toBeDefined();
    expect(styles.nodeStyles).toBeDefined();
    expect(styles.panelStyles).toBeDefined();
    expect(styles.typographyStyles).toBeDefined();
  });

  it('should have the expected button style properties', () => {
    // Update the theme object to match actual colors used
    const theme = {
      spacing: { xs: '4px', sm: '8px', md: '16px' },
      borderRadius: { md: '8px', sm: '4px' },
      colors: { buttonBg: '#1a1a1a', text: '#333', primary: '#999eff' },
      fontSize: { md: '16px', sm: '14px' },
      transitions: { default: '0.3s ease' },
    };

    const buttonStyle = styles.buttonStyles;
    expect(buttonStyle.button).toBeDefined();
    expect(buttonStyle.flowControl).toBeDefined();

    // Check specific properties with updated values
    expect(buttonStyle.button.backgroundColor).toBe(theme.colors.buttonBg);
    expect(buttonStyle.flowControl.backgroundColor).toBe(theme.colors.primary);
  });

  it('should have the expected node style properties', () => {
    const theme = {
      spacing: { xs: '4px', sm: '8px', md: '16px' },
      borderRadius: { sm: '4px' },
      colors: { nodeBg: '#f5f5f5', border: '#ddd' },
      fontSize: { md: '16px' },
      transitions: { default: '0.3s ease' },
    };

    const nodeStyle = styles.nodeStyles;
    expect(nodeStyle.dragAndDropNode).toBeDefined();

    // Check specific properties
    expect(nodeStyle.dragAndDropNode.backgroundColor).toBe(theme.colors.nodeBg);
    expect(nodeStyle.dragAndDropNode.border).toBe(`1px solid ${theme.colors.border}`);
  });

  it('should have the expected panel style properties', () => {
    // Update the theme object to match actual colors used
    const theme = {
      colors: { panelBg: 'rgba(255, 255, 255, 0.9)' },
      borderRadius: { md: '8px' },
      shadows: { md: '0 2px 4px rgba(0,0,0,0.1)' },
      spacing: { sm: '8px', md: '16px' },
    };

    const panelStyle = styles.panelStyles;
    expect(panelStyle.base).toBeDefined();
    expect(panelStyle.smallPadding).toBeDefined();
    expect(panelStyle.mediumPadding).toBeDefined();

    // Check specific properties with updated values
    expect(panelStyle.base.backgroundColor).toBe(theme.colors.panelBg);
    expect(panelStyle.smallPadding.padding).toBe(theme.spacing.sm);
    expect(panelStyle.mediumPadding.padding).toBe(theme.spacing.md);
  });
});
