# React Flow & Deck.gl Learning Repository

This repository contains examples and exercises for learning React Flow and deck.gl library functionalities.

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
      - [Layer Node: Represents a Layer to be Rendered on the Map](#layer-node-represents-a-layer-to-be-rendered-on-the-map)
    - [Basic deck.gl - Add a map visualization with Deck.gl and integrate with current code](#basic-deckgl---add-a-map-visualization-with-deckgl-and-integrate-with-current-code)
    - [Bonus - Support an Intersection Node](#bonus---support-an-intersection-node)
  - [Exercise progress record](#exercise-progress-record)
    - [Basic React Flow - Create a simple flow diagram](#basic-react-flow---create-a-simple-flow-diagram)
    - [Basic React Flow - Create Custom nodes](#basic-react-flow---create-custom-nodes)
      - [Phase 1: Basic structure and types](#phase-1-basic-structure-and-types)
      - [Phase 2: Custom node implementation and styles](#phase-2-custom-node-implementation-and-styles)
    - [Basic deck.gl - Add a map visualization](#basic-deckgl---add-a-map-visualization)
    - [Refactoring and Cleanup](#refactoring-and-cleanup)
    - [End-to-End Testing for Initial Exercises](#end-to-end-testing-for-initial-exercises)
    - [Bonus exercise - Support an intersection node](#bonus-exercise---support-an-intersection-node)
    - [Refactoring and Cleanup - last changes (I though...)](#refactoring-and-cleanup---last-changes-i-though)
    - [Provider Architecture Refactoring and State Synchronization Fixes](#provider-architecture-refactoring-and-state-synchronization-fixes)
  - [Summary about the exercise](#summary-about-the-exercise)
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
   npm run dev
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
- A text input field labeled 'URL' where users can enter the URL of a publicly accessible GeoJSON file (e.g., `https://example.com/my-data.geojson`). This node serves as a spatial data provider that can be consumed by one or more Layer nodes.

> [!TIP]
> It's possible to get sample GeoJSON file URLs from `https://geojson.xyz` to test your implementation.

#### Layer Node: Represents a Layer to be Rendered on the Map

It includes:

- A single input port to receive a connection from a Source node.
- The Layer node visualizes data fetched from the connected Source node in subsequent exercises.

### Basic deck.gl - Add a map visualization with Deck.gl and integrate with current code

Features:

- Switch between diagram and map view using the toggle button.
- Each Layer node connected to a Source node renders a Deck.gl GeoJsonLayer using the URL from the Source node.
- Layers are rendered in the order of their vertical position in the diagram (topmost node is rendered in front).
- Hovering over a geometry on the map shows a tooltip with its properties.

### Bonus - Support an Intersection Node

Implement a new type of node that receives two GeoJSON sources and
computes their spatial intersection using Turf.js.

**Intersection node**: Acts as both input and output. It includes:

1. Two input ports, each expected to be connected to a Source node.
2. One output port, which can be connected to a Layer node

When both input connections are valid (i.e., both point to valid Source nodes with
valid GeoJSON URLs), the node should:

- Compute the spatial intersection between the two using the turf.intersect
  function.
- Provide the resulting GeoJSON as the output of this node.

The Layer node connected to an Intersection node should render the result of the
intersection on the map.

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

I implemented custom nodes for the flow diagram with the following approach:

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

During the implementation of the other exercises, extensive testing and research was conducted on React Flow and deck.gl integration. The codebase required refactoring and cleanup to maintain code quality standards. The main changes include:

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
   - Created utility functions in `src/shared/styles/styleInteractionUtils.ts` for merging base styles with hover/focus/disabled variants.
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

7. **MapViewer Component Architecture Refactoring**
   - Refactored the MapViewer component by extracting domain-specific logic into custom hooks.
   - Created dedicated hooks: `useConnectedLayers`, `useGeojsonCache`, and `useDeckLayers` for better separation of concerns.
   - Extracted utility functions to `mapUtils.ts` for improved code reusability and testability.
   - Consolidated map-related constants in `constants.ts` to eliminate hardcoded values throughout the codebase.
   - Established consistent color management with `LAYER_COLORS` constant for Deck.gl layer styling.

### End-to-End Testing for Initial Exercises

I have implemented comprehensive end-to-end tests for all the initial exercises using Playwright. The tests cover the complete functionality of custom nodes, flow diagram operations, and map visualization. The implementation process included:

1. **Test Architecture Refactoring**
   - Created reusable helper functions in `e2e/helpers/test-helpers.ts` for all common operations (node creation, connections, assertions)
   - Extracted all magic numbers and hardcoded values to semantic constants in `e2e/constants/test-constants.ts`

2. **Comprehensive Test Coverage**
   - **Flow Diagram Tests** (`flow-diagram.spec.ts`): Complete coverage of custom node functionality
     - Custom node creation (Source and Layer nodes)
     - Node connections via drag-and-drop handles
     - URL input functionality for Source nodes
     - Save and restore diagram state from localStorage
     - Node selection and deletion operations
   - **Map Viewer Tests** (`map-viewer.spec.ts`): Full map visualization functionality
     - View switching between diagram and map
     - Map rendering verification with reliable selectors
     - Multiple layer visualization with connected nodes
     - Tooltip functionality on map hover interactions
     - Handling of unconnected nodes (no map layers rendered)

3. **Test Reliability Improvements**
   - Fixed map rendering detection using specific `#deckgl-overlay` canvas selector instead of generic selectors
   - Implemented strategic positioning to avoid UI panel interference during interactions
   - Updated to reliable test data sources with working GeoJSON URLs

4. **Code Quality and Maintainability**
   - **Categorized wait times**: VERY_SHORT (200ms) to LONG (1000ms) based on operation complexity
   - **Standardized positions**: SOURCE_DEFAULT, LAYER_DEFAULT, etc. for consistent test layouts
   - **Semantic selectors**: REACT_FLOW_NODE, DECKGL_WRAPPER, etc. instead of raw CSS selectors
   - **Named expectations**: SINGLE_NODE, DOUBLE_NODES, etc. for clear test assertions
   - **Zero maintenance overhead**: UI changes only require updating constants file

5. **Cross-Browser Testing**
   - Configured tests to run on both Chromium and Firefox
   - All 28 tests pass reliably across both browser engines
   - Consistent behavior verified for drag-and-drop operations and map rendering

The test suite now provides complete coverage of all functionality described in the README exercises, from basic custom node operations to complex map visualizations with multiple connected layers. The architecture is designed to be easily extensible for future functionality while maintaining high reliability and clear documentation through semantic naming conventions.

### Bonus exercise - Support an intersection node

This exercise introduces a new custom node type, `IntersectionCustomNode`, which allows users to compute the intersection of two GeoJSON datasets. The implementation leverages Turf.js for spatial operations and integrates with the existing architecture. Now, I will extend the existing React Flow + Deck.gl application to support spatial intersection operations between GeoJSON datasets using a new intersection node type.

1. **New Node Type: IntersectionCustomNode**
   - Created complete intersection node with canvas and palette components
   - Implemented proper styling with visual indicators for computation status
   - Added validation requiring exactly 2 source connections
   - Status display: "Needs exactly 2 sources", "Loading...", or "Ready"

2. **Spatial Intersection Processing**
   - Integrated Turf.js library for geometric intersection computation
   - Web Worker implementation for non-blocking spatial operations
   - Support for Polygon and MultiPolygon geometry intersection
   - Property merging from intersecting features with computation timestamp

3. **Data Flow Architecture**
   - Enhanced GeoJsonProvider to fetch data for intersection sources
   - New IntersectionProvider for managing intersection computation state
   - IntersectionContext for sharing intersection results across components
   - Smart caching system for intersection results

4. **Worker Management System**
   - Generic WorkerManager base class for type-safe worker communication
   - Specialized IntersectionWorkerManager for intersection operations
   - Proper lifecycle management with error handling and cleanup
   - Message passing interface with typed request/response patterns

5. **Enhanced Testing Coverage**
   - Test scenarios: node creation, connection validation, computation triggers
   - Map visualization testing for intersection results
   - Tooltip functionality for intersection geometry properties

The intersection functionality seamlessly integrates with the existing architecture, allowing users to create complex geospatial analysis workflows by connecting source nodes through intersection nodes to layer nodes for visualization.

### Refactoring and Cleanup - last changes (I though...)

After all exercises and extensive testing, the codebase underwent a final round of refactoring and cleanup to ensure it meets professional standards. The focus was on enhancing code quality, maintainability, and clarity while preserving functionality.

1. **Comment Removal**
   - Eliminated verbose comments
   - Removed generic function descriptions and obvious code explanations
   - Cleaned up implementation details that were clear from code context
   - Maintained only essential business logic comments

2. **Variable and Function Naming Improvements**
   - Replaced single-letter variables (`n`, `e`, `a`, `b`) with descriptive names
   - Updated function names for clarity: `updateSingleIntersectionNode` → `createUpdatedIntersectionNode`
   - Enhanced boolean variables with proper prefixes: `areBothSourcesReady`, `isAlreadyComputed`
   - Improved parameter naming: `firstSourceNode`, `secondSourceNode` vs generic `sourceA`, `sourceB`

3. **File Organization and Naming**
   - Renamed generic files for better clarity:
     - `src/shared/styles/utils.ts` → `styleInteractionUtils.ts`
     - `src/domain/flow/node/components/styles.ts` → `nodeComponentStyles.ts`
   - Updated all import references automatically
   - Maintained consistent naming patterns across similar directories

4. **Code Structure Improvements**
   - **Fixed SonarQube complexity issues**: Extracted helper functions to reduce nesting depth
   - `getConnectedSources()` - isolated source node lookup logic
   - `processIntersectionNode()` - handles validation and computation logic
   - Reduced function nesting from 5+ levels to 3 levels maximum
   - Fixed nested ternary operations with clear if/else statements

5. **TSDoc Documentation**
   - Added comprehensive TSDoc comments to critical functions
   - Documented complex business logic and non-obvious behavior
   - Enhanced functions with proper parameter and return type documentation
   - Focused on utility functions, hooks, workers, and data transformation logic
   - Examples: `getUrlsToFetch()`, `computeIntersectionFeatures()`, `useFilteredGeojson()`

6. **Type Safety and Linting**
   - Fixed TypeScript warnings and errors
   - Replaced `any[]` types with proper `Edge[]` and `Node[]` types
   - Enhanced type guards and interface consistency

### Provider Architecture Refactoring and State Synchronization Fixes

The application had critical state synchronization issues and provider architecture chaos that caused useEffect cycles and performance problems. This session focused on comprehensive provider consolidation and fixing state sharing between domains. The implementation process included:

1. **Provider Architecture Consolidation**
   - **DiagramDataProvider Integration**: Successfully unified nodes and edges providers into a single `DiagramDataProvider` following functional programming patterns
   - **Complete unit test migration**: Updated all tests to use the new consolidated provider with proper mock builders in `__mocks__` folders
   - **Domain separation maintained**: Clear boundaries between `layer-manager` and `map-viewer` domains with controlled state synchronization

2. **Map-Viewer Complete Rewrite**
   - **Clean MapDataProcessor implementation**: Replaced chaotic provider structure with single `MapDataProcessorProvider`.
   - **Worker consolidation**: Unified `geoJsonWorkerManager` and `intersectionWorkerManager` into single `mapWorkerManager` using Vite's `?worker` syntax
   - **Mock extraction**: Moved all hardcoded test mocks to proper `__mocks__` folders with reusable builder functions

3. **Critical Bug Fixes**
   - **Duplicate provider elimination**: Fixed duplicate `MapDataProcessorProvider` in `MapViewerPage` that was creating separate context instances and preventing state sharing
   - **Source node state synchronization**: Resolved issue where source nodes weren't showing processing states (🟡 Computing...) after returning from map view
   - **Worker MIME type resolution**: Fixed worker loading error using proper Vite import syntax instead of relative paths

4. **E2E Test Updates**
   - **Status checking improvement**: Updated `'should render intersection results on the map'` test to use new `waitForNodesReady()` helper function
   - **Proper status parsing**: Implemented regex matching for "Ready: 3 nodes" format instead of manual timeouts
   - **Test constants utilization**: Used existing `MAP_STATUS_PATTERNS` and `SELECTORS` for consistent test behavior

The fixes eliminated the useEffect cycle by proper context isolation, unified worker management, and clean state synchronization between diagram and map domains. Source nodes now correctly display processing states, intersection computations work reliably, and the E2E test suite passes consistently across browsers.

## Summary about the exercise

I put this project together in my spare time, usually in quick bursts—finding long stretches of free time was basically impossible. To really do a proper analysis, you need to be able to focus and study the problem for a while, but that just wasn’t realistic for me this week. On top of that, I had to spend time learning and figuring out React Flow and deck.gl from scratch, since I’d never used either before. Trying to get up to speed with both libraries and build something meaningful in just a week was honestly a bit crazy!

Because of all that, I just dove right in and started building, which meant I ended up refactoring the code a bunch of times as I figured out better ways to organize things. If I’d had more time to plan and really understand the libraries and the problem space, I probably could have saved myself a lot of rework... but hey, that’s part of the learning process, especially when you’re under time pressure.

There are definitely things I could improve or expand on. For example, I only tested intersection nodes with direct connections from source nodes. It would be interesting to try chaining intersection nodes together, connecting the output of one to the input of another, and see how far I could push the workflow. More complex test scenarios like that are still on my to-do list.

On the testing side, I started with basic unit tests and then added end-to-end tests using Playwright. To speed things up on "CI" stuff, I dropped Chromium from the E2E test runs and just stuck with Firefox. That made the test suite a lot faster and still gave me good cross-browser coverage.

Overall, this project was a fun way to explore some new tech and build something interactive from scratch, even if it was a bit of a whirlwind. I learned a lot, made plenty of mistakes, and I'm proud of the final code.

## License

[MIT](LICENSE)
