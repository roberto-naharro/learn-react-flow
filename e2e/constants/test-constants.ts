// Test URLs
export const TEST_URLS = {
  GEOJSON_PARKS:
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_parks_and_protected_lands_scale_rank.geojson',
  GEOJSON_STATES:
    'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson',
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
  REACT_FLOW_HANDLE_BY_ID: (handleId: string) => `[data-handleid="${handleId}"]`,

  // Map elements
  DECKGL_WRAPPER: '#deckgl-wrapper',
  DECKGL_CANVAS: '#deckgl-overlay', // Specific to Deck.gl overlay canvas
  CANVAS: 'canvas',
  DECK_TOOLTIP: '.deck-tooltip',

  // Input elements
  GEOJSON_URL_INPUT: 'input[placeholder="Enter GeoJSON URL"]',

  // Status indicators
  MAP_PROCESSING_STATUS_ID: 'map-processing-status',
} as const;

// Button text patterns
export const BUTTON_PATTERNS = {
  ADD_SOURCE_NODE: /add source node/i,
  ADD_LAYER_NODE: /add layer node/i,
  ADD_INTERSECTION_NODE: /add intersection node/i,
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
  INTERSECTION: 60000, // For intersection computation
} as const;

// Node positions for consistent test layouts
export const NODE_POSITIONS = {
  SOURCE_DEFAULT: { x: 0, y: 100 },
  SOURCE_SECONDARY: { x: 400, y: 500 },
  INTERSECTION_DEFAULT: { x: 700, y: 300 },
  LAYER_DEFAULT: { x: 800, y: 275 },
  SOURCE_SECOND: { x: 100, y: 300 },
  LAYER_SECOND: { x: 1000, y: 300 },
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
  TRIPLE_NODES: 3,
  QUAD_NODES: 4,
  NO_ELEMENTS: 0,
  SINGLE_EDGE: 1,
  DOUBLE_EDGES: 2,
  TRIPLE_EDGES: 3,
  MINIMUM_EDGES: 1, // For tests where second connection might fail
} as const;

// Keyboard shortcuts
export const KEYBOARD = {
  DELETE: 'Delete',
  SELECT_ALL: 'Control+a',
  ESCAPE: 'Escape',
} as const;

// Test states
export const TEST_STATES = {
  VISIBLE: 'visible' as const,
  ENABLED: 'enabled' as const,
} as const;

// Map processing status text patterns
export const MAP_STATUS_PATTERNS = {
  READY: 'Ready:',
  NO_LAYERS: 'No layers to process',
  PROCESSING: 'Processing:',
} as const;

export const MAP_INFO_TOP_TIP_TEXT = {
  // Processing: 2 loading, 0 computing, 1 ready
  PROCESSING: 'Processing:',
  LOADING: 'loading',
  COMPUTING: 'computing',
  READY: 'ready',
  ERROR: 'error',
} as const;

// Drag and drop options
export const DRAG_OPTIONS = {
  FORCE: { force: true },
  WITH_POSITION: (position: { x: number; y: number }) => ({
    force: true,
    targetPosition: position,
  }),
} as const;
