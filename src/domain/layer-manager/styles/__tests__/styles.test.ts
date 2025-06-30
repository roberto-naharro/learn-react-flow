import { describe, expect, it } from '@jest/globals';

import { buttonStyles } from '../buttons';
import { nodeStyles } from '../nodes';

describe('Layer Manager Local Style exports', () => {
  it('should export buttonStyles and nodeStyles correctly', () => {
    expect(buttonStyles).toBeDefined();
    expect(nodeStyles).toBeDefined();
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

    expect(buttonStyles.button).toBeDefined();
    expect(buttonStyles.flowControl).toBeDefined();

    // Check specific properties with updated values
    expect(buttonStyles.button.backgroundColor).toBe(theme.colors.buttonBg);
    expect(buttonStyles.flowControl.backgroundColor).toBe(theme.colors.primary);
  });

  it('should have the expected node style properties', () => {
    const theme = {
      spacing: { xs: '4px', sm: '8px', md: '16px' },
      borderRadius: { sm: '4px' },
      colors: { nodeBg: '#f5f5f5', border: '#ddd' },
      fontSize: { md: '16px' },
      transitions: { default: '0.3s ease' },
    };

    expect(nodeStyles.dragAndDropNode).toBeDefined();

    // Check specific properties
    expect(nodeStyles.dragAndDropNode.backgroundColor).toBe(theme.colors.nodeBg);
    expect(nodeStyles.dragAndDropNode.border).toBe(`1px solid ${theme.colors.border}`);
  });
});
