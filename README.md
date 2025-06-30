# React Flow & Deck.gl Learning Repository

This repository contains examples and exercises for learning and testing functionalities of React Flow and deck.gl libraries.

## Table of Contents

- [React Flow \& Deck.gl Learning Repository](#react-flow--deckgl-learning-repository)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Development Tooling](#development-tooling)
    - [Installation](#installation)
  - [Testing](#testing)
    - [Unit Testing with Jest](#unit-testing-with-jest)
    - [End-to-End Testing with Playwright](#end-to-end-testing-with-playwright)
    - [Test Configuration](#test-configuration)
    - [Continuous Integration](#continuous-integration)
  - [Exercises](#exercises)
    - [Basic React Flow - Create a basic React app with ReactFlow](#basic-react-flow---create-a-basic-react-app-with-reactflow)
      - [Create a simple flow diagram](#create-a-simple-flow-diagram)
      - [Create Custom nodes](#create-custom-nodes)
        - [Source node: Represents a data source (e.g., a URL pointing to a GeoJSON file)](#source-node-represents-a-data-source-eg-a-url-pointing-to-a-geojson-file)
      - [Layer node: Represents a layer to be rendered on the map](#layer-node-represents-a-layer-to-be-rendered-on-the-map)
    - [Basic deck.gl - Add a map visualization with Deck.gl and integrate with current code](#basic-deckgl---add-a-map-visualization-with-deckgl-and-integrate-with-current-code)
    - [Bonus - Support an intersection node](#bonus---support-an-intersection-node)
  - [Exercise progress record](#exercise-progress-record)
    - [Basic React Flow - Create a simple flow diagram](#basic-react-flow---create-a-simple-flow-diagram)
    - [Basic React Flow - Create Custom nodes](#basic-react-flow---create-custom-nodes)
      - [Phase 1: Basic structure and types](#phase-1-basic-structure-and-types)
      - [Phase 2: Custom node implementation and styles](#phase-2-custom-node-implementation-and-styles)
    - [Basic deck.gl - Add a map visualization](#basic-deckgl---add-a-map-visualization)
    - [Refactoring and Cleanup](#refactoring-and-cleanup)
  - [License](#license)

## Overview

This project serves as a playground for exploring interactive data visualization capabilities using:

- [React Flow](https://reactflow.dev/) - A library for building node-based editors and interactive diagrams
- [deck.gl](https://deck.gl/) - A WebGL-powered framework for visual exploratory data analysis of large datasets

## Getting Started

### Prerequisites

- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm)

### Development Tooling

This project includes several development tools to ensure code quality and consistency:

- **ESLint** - JavaScript and TypeScript linter configured with:
  - `@eslint/js` - Modern ESLint JavaScript configuration
  - `typescript-eslint` - TypeScript integration for ESLint
  - `eslint-plugin-react-hooks` - React Hooks rules enforcing best practices
  - `eslint-plugin-react-refresh` - Support for React Fast Refresh in Vite
  - `eslint-config-prettier` - Disables ESLint rules that conflict with Prettier

- **TypeScript** - Static type checker for JavaScript
  - Fully configured for React development
  - Enhanced editor integration with type definitions

- **Prettier** - Opinionated code formatter
  - Configured with common React project settings
  - Ensures consistent code style across the project

- **Husky** - Git hooks manager
  - Runs checks before commits and pushes
  - Prevents committing code that doesn't meet quality standards
  - Integrated with lint-staged and commitlint

- **lint-staged** - Run linters on staged files
  - Only checks files that are being committed
  - Improves performance by focusing on changed files

- **Commitlint** - Enforces commit message conventions
  - Uses conventional commit format
  - Makes commit history more readable and useful
  - Enables automated versioning and changelog generation

- **Vite** - Next generation frontend tooling
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

## Testing

This project uses a comprehensive testing strategy with separate tools for unit and end-to-end testing:

### Unit Testing with Jest

- **Jest** - JavaScript testing framework
  - Configured with TypeScript support via ts-jest
  - Separate TypeScript configuration in `tsconfig.jest.json`
  - Asset mocking for SVGs, CSS, and other static files
  - Coverage reporting

Running unit tests:

```bash
# Run all unit tests
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage
```

### End-to-End Testing with Playwright

- **Playwright** - Modern E2E testing framework
  - Cross-browser testing (Chrome, Firefox)
  - Visual testing capabilities
  - Network interception and mocking
  - Configured in `playwright.config.ts`

Running E2E tests:

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui
```

### Test Configuration

- Unit tests are located in `src/**/__tests__/` and files with `.test.ts(x)` extensions
- E2E tests are located in the `e2e/` directory
- Both test environments exclude each other to prevent interference
- The project uses separate TypeScript configurations for each environment

### Continuous Integration

- Pre-push hook runs all tests before pushing to the repository
  - Jest unit tests run first
  - Playwright E2E tests run after unit tests pass
  - Push fails if either test suite fails
  - Can be configured or temporarily disabled in `.husky/config.js`
- Pre-commit hooks ensure code quality:
  - ESLint checks for code quality issues
  - Prettier formats code consistently
  - TypeScript compiler verifies type correctness
- Commit message validation enforces conventional commit format
  - Ensures readable, consistent commit history
  - Facilitates automated versioning and changelog generation

## Exercises

This repository includes exercises to help you learn both libraries:

### Basic React Flow - Create a basic React app with ReactFlow

#### Create a simple flow diagram

Features:

- Add nodes via drag & drop
- Connect nodes using edges
- Delete nodes and edges
- Save and load the diagram state from the local storage

#### Create Custom nodes

Implement the following custom nodes:

##### Source node: Represents a data source (e.g., a URL pointing to a GeoJSON file)

It includes:

- A single output port to connect to downstream nodes.
- A text input field labeled URL, where the user can enter the URL of a publicly accessible GeoJSON file (e.g.,
  <https://example.com/my-data.geojson>).
  This node acts as a provider of spatial data that can be consumed by
  one or more Layer nodes.

> [!TIP]
> It's possible to get sample GeoJSON file URLs from <https://geojson.xyz> to test your implementation.

#### Layer node: Represents a layer to be rendered on the map

It includes:

- A single input port to receive a connection from a Source node.
- The Layer node will visualize the data fetched from the connected Source in next exercises.

### Basic deck.gl - Add a map visualization with Deck.gl and integrate with current code

Features:

- Switch between diagram and map view using the toggle button.
- Each Layer node connected to a Source node renders a Deck.gl GeoJsonLayer using the URL from the Source node.
- Layers are rendered in the order of their vertical position in the diagram (topmost node is rendered in front).
- Hovering over a geometry on the map shows a tooltip with its properties.

### Bonus - Support an intersection node

## Exercise progress record

### Basic React Flow - Create a simple flow diagram

I have implemented a basic flow diagram editor with React Flow using a modular, context-based architecture. The implementation process included:

1. **Application Architecture Setup**
   - Created a domain-driven structure separating the layer-manager functionality
   - Implemented a custom router for navigation between pages
   - Set up a clean component hierarchy with proper separation of concerns

2. **Context-Based State Management**
   - Refactored from prop drilling to a context-based architecture
   - Created specialized providers for different concerns:
     - `NodesProvider`: Manages node state and operations
     - `EdgesProvider`: Handles edge state and connections
     - `DragAndDropProvider`: Coordinates drag and drop operations
     - `PersistenceProvider`: Manages saving and loading diagram state

3. **React Flow Integration**
   - Implemented the main `FlowCanvas` component with React Flow
   - Created drag-and-drop functionality for adding new nodes
   - Set up node connections
   - Added controls for manipulating the diagram (zoom, pan)

4. **User Interface Components**
   - Created a `NodePalette` component for selecting node types
   - Implemented an `ActionPanel` with buttons for saving, restoring, and resetting
   - Added a `ControlPanel` with instructions and drag sources
   - Used styled components for consistent UI appearance

5. **Data Persistence**
   - Implemented localStorage-based persistence for diagram state
   - Created functions for saving, loading, and resetting the diagram
   - Ensured proper viewport restoration when loading saved diagrams

6. **Code Quality and Organization**
   - Set up proper TypeScript types throughout the application
   - Organized code into logical domains and modules
   - Created custom hooks for specific functionality
   - Ensured proper error handling and edge cases

The implementation successfully addresses all required features:

- Adding nodes via drag & drop from a palette
- Connecting nodes using edges with intuitive handle interactions
- Deleting nodes and edges using keyboard shortcuts
- Saving and loading the diagram state from local storage

The architecture is designed to be extensible for future features like custom nodes.

### Basic React Flow - Create Custom nodes

I have started implementing custom nodes for the flow diagram:

#### Phase 1: Basic structure and types

1. **Node Palette Refactor**
   - Refactored the `NodePalette` to support both basic and custom node types using a unified `AppNode` component.
   - The palette now supports extensible node definitions and drag-and-drop for custom nodes.

2. **Custom Node Types**
   - Added a `Source` node type:
     - Represents a data source
   - Added a `Layer` node type

3. **TypeScript Types and Validation**
   - Defined strong TypeScript types for node props and node type guards.
   - Ensured type safety and extensibility for future custom nodes.

4. **Component Structure**
   - Created separate components for each node type (`BasicNode`, `SourceCustomNode`, `LayerCustomNode`).
   - Used a shared container for consistent drag-and-drop and accessibility behavior.

5. **Testing**
   - Updated and extended tests for the node palette and drag-and-drop logic to cover custom node types.
   - Skip e2e test for now. They will be updated with the final custom nodes version

#### Phase 2: Custom node implementation and styles

1. **Custom Node Canvas Components**
   - Implemented `SourceCustomNode` and `LayerCustomNode` React components for use in the flow diagram.
   - Each custom node has its own styles and structure, matching the design requirements.

2. **Custom Node Palette Components**
   - Created palette components for each custom node (`SourceCustomNodePalette`, `LayerCustomNodePalette`) with visual cues for connection points.
   - Used consistent drag-and-drop containers and accessible markup.

3. **Styling**
   - Added dedicated style modules for custom nodes and their palette representations.
   - Leveraged the shared theme and style utilities for consistent appearance.

4. **Node Type Registration**
   - Registered custom node types in the `getNodeTypes` utility for React Flow.
   - Ensured correct prop injection (e.g., `onUrlChange` for the Source node).

5. **Context and State Integration**
   - Extended the nodes context/provider to support updating node data (e.g., updating the URL in the Source node).
   - Connected custom node input fields to context-driven state updates.

6. **Testing**
   - Added and updated unit tests for the node palette and custom node drag-and-drop logic.
   - Ensured that custom nodes appear and behave correctly in the palette and on the canvas.

### Basic deck.gl - Add a map visualization

I have implemented the basic deck.gl integration with the React Flow diagram, allowing users to visualize data layers on a map. The implementation process included:

1. **Dependencies Setup**
   - Added `@deck.gl/core`, `@deck.gl/layers`, `@deck.gl/react`, `react-map-gl`, and `maplibre-gl` to the project dependencies.
   - Ensured type support for GeoJSON and Deck.gl.

2. **Map Viewer Page and Navigation**
   - Created `MapViewerPage` and `MapViewer` components under `src/map-viewer/`.
   - Added a toggle button to switch between the diagram and map view.
   - Updated the router and action panel to support navigation between views.

3. **Rendering GeoJSON Layers**
   - Implemented logic to find all Layer nodes connected to Source nodes.
   - For each Layer node, fetched the GeoJSON from the connected Source node's URL.
   - Rendered a Deck.gl `GeoJsonLayer` for each connected Layer node.
   - Layers are rendered in the order of their vertical position in the diagram (topmost node is rendered in front).

4. **Map Interactivity and Tooltips**
   - Added support for hovering over geometries on the map to show a tooltip with their properties.
   - Ensured the map and tooltip are styled and positioned correctly.

5. **Styling and Test Updates**
   - Refactored and unified style imports for all components, moving shared styles to `src/styles/`.
   - Updated and added tests for style modules and the new map view.
   - Ensured all navigation and state management works between the diagram and map views.

### Refactoring and Cleanup

During the implementation, of the other exercises, I have done a lot of testing and research about how to use React Flow and deck.gl together. The code end up being a bit messy, so I took the opportunity to refactor and clean up the codebase. The main changes include:

1. **Domain-Driven Folder Structure**
   - Reorganized the `src/` directory by business domains: `flow`, `layer-manager`, and `map-viewer`.
   - Grouped all related components, hooks, context, types, and styles within each domain folder.
   - Extracted truly reusable code (components, hooks, utilities, styles) into a `shared/` directory.
   - Placed application-level infrastructure (such as the router) in a dedicated `router/` folder, separate from both domain and shared code.

2. **Node Domain Organization**
   - Moved all node-related logic (custom node components, palette, type guards, and styles) under `domain/flow/nodes/` to reflect their tight coupling with the flow domain.

3. **Comprehensive CSS-in-JS Styling System**
   - Implemented a complete theme-based styling system using CSS-in-JS with TypeScript support.
   - Created a centralized theme (`src/shared/styles/theme.ts`) with comprehensive color palettes, spacing scales, typography, shadows, and transitions.
   - Established shared foundation styles for buttons, forms, typography, panels, and nodes in `src/shared/styles/`.
   - Organized styles hierarchically from component-specific to domain-specific to shared styles.

4. **Interactive State Management Without SASS**
   - Implemented React state-driven interactive states using `useState` and event handlers (`onMouseEnter/Leave`, `onFocus/Blur`).
   - Created utility functions in `src/shared/styles/utils.ts` for merging base styles with hover/focus/disabled variants.
   - Updated components like `NodeTypePaletteContainer` to use proper React state management for interactive styling.

5. **Style Cleanup and Consolidation**
   - Moved hardcoded inline styles from components to dedicated `.styles.ts` files (e.g., `MapViewer.styles.ts`).
   - Eliminated redundant domain-specific style files by consolidating common patterns into shared styles.
   - Updated all style imports to use the enhanced shared style system with proper theme-based values.
   - Removed unused CSS class names in favor of consistent CSS-in-JS objects.

6. **Comprehensive Style Testing**
   - Created extensive tests in `src/shared/styles/__tests__/` covering theme consistency, variant styles, and interactive state utilities.
   - Added component-specific style tests for key components like `NodePalette` and `MapViewer`.
   - Implemented integration tests for style utility functions to ensure proper hover/focus state management.

## License

[MIT](LICENSE)
