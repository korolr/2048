# CLAUDE.md

## Project Overview

This is a **2048 game implementation** built with **Svelte 3** as a learning project to test SvelteJS in game development. The game features a 4x4 grid where players combine numbered tiles by sliding them in four directions (up, down, left, right) to reach the 2048 tile.

**Tech Stack:**
- Framework: Svelte 3
- Build Tool: Rollup
- Bundler: Rollup with plugins (svelte, terser, livereload)
- Touch Support: xwiper library for swipe gestures
- Server: sirv-cli for local development

## Repository Structure

```
/
├── public/                 # Static files and build output
│   ├── index.html         # Entry HTML file
│   ├── global.css         # Global styles
│   ├── favicon.png        # Favicon
│   ├── bundle.js          # Built JavaScript (generated)
│   └── bundle.css         # Built CSS (generated)
├── src/                   # Source code
│   ├── main.js            # Application entry point
│   ├── App.svelte         # Root Svelte component
│   ├── components/        # Reusable components
│   │   └── Cell.svelte    # Individual grid cell component
│   ├── containers/        # Container components
│   │   └── Main.svelte    # Main game container
│   ├── logic/             # Game logic
│   │   ├── index.js       # Core logic (spawn, check state)
│   │   └── key/           # Direction handlers
│   │       ├── left.js    # Left movement logic
│   │       ├── right.js   # Right movement logic
│   │       ├── up.js      # Up movement logic
│   │       └── down.js    # Down movement logic
│   └── stores/            # Svelte stores for state management
│       ├── score.js       # Score tracking store
│       └── max.js         # Max tile value tracking store
├── rollup.config.js       # Rollup build configuration
├── package.json           # Dependencies and scripts
└── .gitignore            # Git ignore rules
```

## Architecture

### Component Hierarchy

```
App.svelte (root)
└── Main.svelte (game container)
    └── Cell.svelte (x16 grid cells)
```

### Data Flow

1. **State Management**: Game state is maintained in `Main.svelte` as a 4x4 array
2. **Stores**: Global state (score, max tile) managed via Svelte stores
3. **Input Handling**: Keyboard events and swipe gestures trigger movement functions
4. **Logic Layer**: Pure functions in `src/logic/` handle game mechanics
5. **Rendering**: Svelte reactivity automatically updates UI when state changes

## Key Files and Their Purposes

### Entry Points

- **src/main.js**: Application bootstrap, mounts App to document.body
- **src/App.svelte**: Root component, imports Main container
- **public/index.html**: HTML shell that loads bundled JS/CSS

### Core Components

#### Main.svelte (src/containers/Main.svelte)
The primary game container that:
- Maintains the 4x4 game state (16 cells with id and block value)
- Handles keyboard events (arrow keys via event.keyCode 37-40)
- Integrates swipe gestures using xwiper library
- Spawns initial cells on mount
- Renders grid and displays score/win condition

**State Structure:**
```javascript
state = [
  [
    { id: 1.1, block: null },  // Each cell has unique float ID
    { id: 1.2, block: null },  // block: null (empty) or number (2, 4, 8, ...)
    // ...
  ],
  // ... 4 rows total
]
```

#### Cell.svelte (src/components/Cell.svelte)
Presentational component for individual grid cells:
- Accepts `value` prop (cell object)
- Renders empty state for `block === null`
- Applies value-specific styling (different colors for 2, 4, 8, ..., 2048)
- Responsive design with mobile breakpoints (@media max-width: 420px)

### Game Logic (src/logic/)

#### index.js
Core utilities:
- **spawnCell(data)**: Randomly places a 2 or 4 in an empty cell
- **checkState(data)**: Verifies if moves are possible, triggers game over

#### Direction Handlers (src/logic/key/)
Each direction file (left.js, right.js, up.js, down.js) follows similar patterns:
- Slide tiles in the specified direction
- Merge matching adjacent tiles
- Use `dupLeft/dupRight/dupUp/dupDown` helper to compact cells
- Track if move was legal
- Call `spawnCell()` if legal, else `checkState()`
- Update max tile value via `updateMax()`

**Important:** Movement logic uses nested loops with indices specific to direction:
- Left: iterate columns right-to-left (j from 3 to 0)
- Right: iterate columns left-to-right
- Up: iterate rows bottom-to-top
- Down: iterate rows top-to-bottom

### State Stores (src/stores/)

#### score.js
- Writable store tracking cumulative score
- `updateScore(a)`: Adds value to score (called when spawning cells)

#### max.js
- Writable store tracking highest tile value
- `updateMax(a)`: Updates max if new value is higher
- Used to detect win condition (2048)

## Development Workflows

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Runs two concurrent processes:
- `sirv public --dev`: Development server with hot reload
- `rollup -c -w`: Watch mode bundler

Access at http://localhost:5000 (default sirv port)

### Production Build

```bash
npm run build
```

Creates optimized bundle in `public/`:
- Minified JavaScript (terser plugin)
- Extracted CSS
- Sourcemaps enabled

### Serve Production Build

```bash
npm start
```

Serves the production build from `public/` directory.

## Code Conventions

### Svelte Component Style

1. **Structure Order**: `<script>` → `<style>` → markup
2. **Script Block**:
   - Import statements first
   - Store subscriptions ($score, $max)
   - Component state declarations
   - Function definitions
   - Lifecycle hooks (onMount) last
3. **Scoped Styles**: Component styles are scoped by default
4. **Global Styles**: Use `:global(selector)` for global CSS

### Naming Conventions

- **Components**: PascalCase (Cell.svelte, Main.svelte)
- **Functions**: camelCase (spawnCell, checkState, updateScore)
- **Files**: lowercase for logic (index.js, left.js)
- **Stores**: lowercase exports (score, max)

### State Management Patterns

1. **Local State**: Use `let` declarations in components
2. **Global State**: Use Svelte stores (writable) for cross-component data
3. **Reactivity**: Rely on Svelte's `$` syntax for store subscriptions
4. **Immutability**: Movement functions return new state, triggering reactivity

### Cell ID System

Cells use float IDs (1.1, 1.2, ..., 4.4) where:
- Integer part: row number (1-4)
- Decimal part: column number (1-4)
- Used as Svelte `{#each}` key for efficient updates

## Game Logic Patterns

### Movement Function Template

Each direction handler follows this pattern:

```javascript
export function direction(data) {
  let isLegal = false;

  // Helper function to compact cells after move
  function dupDirection(i) {
    // Slide logic to eliminate gaps
  }

  // Main loop: iterate appropriate direction
  for (let i = 0; i <= 3; i++) {
    for (let j = ...) {  // Direction-specific range
      // Case 1: Slide into empty cell
      if (adjacent is null) {
        // Move block
        isLegal = true;
        dupDirection(i);
      }
      // Case 2: Merge with matching tile
      else if (adjacent equals current) {
        // Merge blocks
        isLegal = true;
        updateMax(merged value);
        dupDirection(i);
      }
    }
  }

  return isLegal ? spawnCell(data) : checkState(data);
}
```

### Key Logic Insights

1. **Legal Moves**: A move is legal if any tile moved or merged
2. **Spawn Timing**: New tile spawns only after legal moves
3. **Game Over**: Triggered when checkState finds no empty cells and no legal moves
4. **Win Condition**: Checked in Main.svelte when `$max === 2048`

## Build Configuration

### Rollup Setup (rollup.config.js)

- **Entry**: src/main.js
- **Output**: public/bundle.js (IIFE format)
- **Plugins**:
  - `rollup-plugin-svelte`: Compiles Svelte components
  - `rollup-plugin-node-resolve`: Resolves node_modules
  - `rollup-plugin-commonjs`: Converts CommonJS to ES modules
  - `rollup-plugin-livereload`: Hot reload in dev mode
  - `rollup-plugin-terser`: Minification in production

**Production Detection**: `!process.env.ROLLUP_WATCH`

## Input Handling

### Keyboard
- Arrow keys mapped via `event.keyCode`:
  - 37: Left
  - 38: Up
  - 39: Right
  - 40: Down
- Handled by `<svelte:window on:keydown={handleKey} />`

### Touch/Swipe
- xwiper library attached to body element
- Callbacks: `onSwipeLeft/Right/Up/Down()`
- Enables mobile gameplay

## Guidelines for AI Assistants

### When Modifying Game Logic

1. **Read Before Editing**: Always read existing direction handlers to understand patterns
2. **Test Movement**: Changes to movement logic affect all four directions similarly
3. **Preserve Spawn Logic**: Maintain `isLegal` flag pattern for proper spawn behavior
4. **Update Stores**: Ensure score/max updates happen at correct times

### When Adding Features

1. **Component Structure**: Follow existing hierarchy (components vs containers)
2. **State Location**:
   - Game grid state: Keep in Main.svelte
   - Cross-component data: Use stores
   - Component-specific: Local `let` declarations
3. **Styling**: Use scoped styles in components, global styles sparingly
4. **Reactivity**: Leverage Svelte's reactive statements (`$:`) when needed

### When Refactoring

1. **DRY for Directions**: Movement logic has intentional duplication (different indices/directions)
2. **Cell ID System**: Don't change float ID pattern (impacts keying)
3. **Build Output**: Never commit `public/bundle.*` files
4. **Dependencies**: Keep dependencies minimal (currently only xwiper)

### Code Quality Standards

1. **No Unused Vars**: Remove unused code completely (no `_var` patterns)
2. **Simple Solutions**: Avoid over-engineering, keep game logic straightforward
3. **Consistent Formatting**: Match existing indentation (2 spaces)
4. **Comments**: Only add where logic isn't self-evident (movement algorithms)

### Testing Considerations

- **Manual Testing**: Run `npm run dev` and test all four directions
- **Edge Cases**:
  - Full board scenarios
  - No valid moves
  - Win condition (2048 tile)
  - Multiple merges in single move
- **Mobile**: Test swipe gestures on touch devices

### Common Pitfalls to Avoid

1. **Mutating State Directly**: Movement functions should return new state
2. **Breaking Reactivity**: Assignment (`=`) triggers updates, method calls don't
3. **Index Confusion**: Direction logic uses different loop ranges (0→3 vs 3→0)
4. **Spawn Bugs**: Ensure spawnCell only called after legal moves
5. **Store Imports**: Remember to import both store and update function if needed

## Git Workflow

### Ignored Files
- `.DS_Store` (macOS)
- `node_modules/`
- `public/bundle.*` (build artifacts)

### Branch Strategy
- Feature branches: Follow `claude/` prefix pattern
- Commit messages: Descriptive, focus on "why" over "what"
- Push: Use `-u origin <branch-name>` for new branches

## Performance Considerations

1. **Bundle Size**: Production build uses terser for minification
2. **Keyed Each**: Cell IDs enable efficient Svelte diffing
3. **Scoped CSS**: Component styles automatically scoped
4. **Sourcemaps**: Enabled for debugging (both dev and prod)

## Future Enhancement Ideas

When users request new features, consider:
- Undo/redo functionality (requires state history)
- Animations for tile movements
- High score persistence (localStorage)
- Different grid sizes (5x5, 6x6)
- Theme customization
- Sound effects
- Game statistics tracking

For any of these, maintain the current architecture patterns and consult existing code before implementing.
