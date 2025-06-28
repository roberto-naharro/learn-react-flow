# React Flow & Deck.gl Learning Repository

This repository contains examples and exercises for learning and testing functionalities of React Flow and deck.gl libraries.

## Overview

This project serves as a playground for exploring interactive data visualization capabilities using:

- [React Flow](https://reactflow.dev/) - A library for building node-based editors and interactive diagrams
- [deck.gl](https://deck.gl/) - A WebGL-powered framework for visual exploratory data analysis of large datasets

## Getting Started

### Prerequisites

- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)

### Development Tooling

This project includes several development tools to ensure code quality and consistency:

- **ESLint (v9.30.0)** - JavaScript and TypeScript linter configured with:
  - `@eslint/js` - Modern ESLint JavaScript configuration
  - `typescript-eslint` - TypeScript integration for ESLint
  - `eslint-plugin-react-hooks` - React Hooks rules enforcing best practices
  - `eslint-plugin-react-refresh` - Support for React Fast Refresh in Vite
  - `eslint-config-prettier` - Disables ESLint rules that conflict with Prettier

- **TypeScript (v5.8.3)** - Static type checker for JavaScript
  - Fully configured for React development
  - Enhanced editor integration with type definitions

- **Prettier (v3.6.2)** - Opinionated code formatter
  - Configured with common React project settings
  - Ensures consistent code style across the project

- **Husky (v9.1.7)** - Git hooks manager
  - Runs checks before commits and pushes
  - Prevents committing code that doesn't meet quality standards
  - Integrated with lint-staged and commitlint

- **lint-staged (v16.1.2)** - Run linters on staged files
  - Only checks files that are being committed
  - Improves performance by focusing on changed files

- **Commitlint (v19.8.1)** - Enforces commit message conventions
  - Uses conventional commit format
  - Makes commit history more readable and useful
  - Enables automated versioning and changelog generation

- **Vite (v7.0.0)** - Next generation frontend tooling
  - Ultra-fast development server with HMR
  - Optimized production builds
  - Configured with `@vitejs/plugin-react` for React support

- **EditorConfig** - Editor-agnostic coding style definitions
  - Ensures consistent spacing and line endings across different editors
  - Complements Prettier configuration

- **NVM support** - Ensures consistent Node.js version (v22.17.0)
  - Configured via `.nvmrc` file
  - Setup script in `scripts/prepare.sh`

These tools work together to maintain code quality and consistent style throughout the project.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/learn-react-flow.git
   cd learn-react-flow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Exercises

This repository includes exercises to help you learn both libraries:

1. **Basic React Flow** - Create a basic React app with ReactFlow
2. **Basic deck.gl** - Add a map visualization with Deck.gl and integrate with current code
3. **Bonus** - Support an intersection node

## License

[MIT](LICENSE)
