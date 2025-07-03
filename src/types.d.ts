/// <reference types="vite/client" />

// Type declarations for modules without TypeScript definitions
declare module '@dword-design/eslint-plugin-import-alias' {
  import type { ESLint } from 'eslint';
  
  interface ImportAliasPlugin {
    configs: {
      recommended: {
        plugins: Record<string, any>;
      };
    };
  }
  
  const plugin: ImportAliasPlugin;
  export default plugin;
}
