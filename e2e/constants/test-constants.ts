// Test URLs
export const TEST_URLS = {
  GEOJSON_PARKS:
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_parks_and_protected_lands_scale_rank.geojson',
} as const;

// Selectors
export const SELECTORS = {
  // React Flow
  REACT_FLOW: '.react-flow',
  REACT_FLOW_PANE: '.react-flow__pane',
  REACT_FLOW_NODE: '.react-flow__node',
  REACT_FLOW_EDGE: '.react-flow__edge',
  REACT_FLOW_HANDLE_RIGHT: '.react-flow__handle-right',
  REACT_FLOW_HANDLE_LEFT: '.react-flow__handle-left',

  // Map elements
  DECKGL_WRAPPER: '#deckgl-wrapper',
  DECKGL_CANVAS: '#deckgl-overlay', // Specific to Deck.gl overlay canvas
  CANVAS: 'canvas',
  DECK_TOOLTIP: '.deck-tooltip',

  // Input elements
  GEOJSON_URL_INPUT: 'input[placeholder="Enter GeoJSON URL"]',
} as const;

// Button text patterns
export const BUTTON_PATTERNS = {
  ADD_SOURCE_NODE: /add source node/i,
  ADD_LAYER_NODE: /add layer node/i,
  SAVE: /save/i,
  RESTORE: /restore/i,
  RESET: /reset/i,
  SHOW_MAP: /Show map/i,
  SHOW_DIAGRAM: /Show Diagram/i,
} as const;

// Wait times (in milliseconds)
export const WAIT_TIMES = {
  VERY_SHORT: 200, // For quick UI updates
  SHORT: 300, // For node creation, connections
  MEDIUM: 500, // For complex operations, map loading
  LONG: 1000, // For heavy operations
} as const;

// Node positions for consistent test layouts
export const NODE_POSITIONS = {
  SOURCE_DEFAULT: { x: 100, y: 100 },
  LAYER_DEFAULT: { x: 300, y: 100 },
  SOURCE_SECOND: { x: 100, y: 300 },
  LAYER_SECOND: { x: 300, y: 300 },
  LAYER_OFFSET: { x: 120, y: 120 },
  CANVAS_CENTER: { x: 400, y: 300 }, // Moved away from UI panels
} as const;

// Mouse positions for map interactions
export const MOUSE_POSITIONS = {
  ONE_THIRD: (width: number, height: number) => ({ x: width / 3, y: height / 3 }),
  CENTER: (width: number, height: number) => ({ x: width / 2, y: height / 2 }),
  TWO_THIRDS: (width: number, height: number) => ({ x: (width * 2) / 3, y: (height * 2) / 3 }),
} as const;

// Expected counts for verification
export const EXPECTED_COUNTS = {
  SINGLE_NODE: 1,
  DOUBLE_NODES: 2,
  QUAD_NODES: 4,
  NO_ELEMENTS: 0,
  SINGLE_EDGE: 1,
  MINIMUM_EDGES: 1, // For tests where second connection might fail
} as const;

// Keyboard shortcuts
export const KEYBOARD = {
  DELETE: 'Delete',
  SELECT_ALL: 'Control+a',
} as const;

// Test states
export const TEST_STATES = {
  VISIBLE: 'visible' as const,
  ENABLED: 'enabled' as const,
} as const;

// Drag and drop options
export const DRAG_OPTIONS = {
  FORCE: { force: true },
  WITH_POSITION: (position: { x: number; y: number }) => ({
    force: true,
    targetPosition: position,
  }),
} as const;
