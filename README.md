# Spinning Wheel Game

An interactive spinning wheel game with customizable prizes and themes.

## Features

- **Prize Configuration**
  - Customizable prize lists (2-12 prizes)
  - Predefined prize sets (Fun Items, Money Prizes)
  - Add/Remove prizes dynamically
  
- **Theme System**
  - Vibrant Theme (Default): Modern color scheme with greens, purples, and oranges
  - Warm Theme: Cozy color scheme with corals, oranges, and yellows
  - Smooth theme transitions
  
- **Interactive Wheel**
  - Smooth spinning animation with easing
  - Accurate prize selection
  - Visual indicator at top
  - Dynamic segment coloring

## Technical Details

### Prize Calculation

The wheel uses a precise mathematical approach to determine the winning prize:
1. Starts segments from top (-π/2)
2. Rotates clockwise
3. Uses half-angle offset for indicator alignment
4. Normalizes final rotation for accurate prize selection

### Theme Implementation

Themes are implemented using CSS variables and data attributes:
- `data-theme="vibrant"` for vibrant theme
- Default (no attribute) for warm theme
- Colors are defined in `:root` and `[data-theme="vibrant"]`

### Wheel Configuration

- Segments are drawn clockwise from top
- Each segment spans `2π/totalPrizes` radians
- Text is centered within segments
- Gradient coloring for visual depth

## Usage

1. **Prize Configuration:**
   - Use dropdown to select predefined lists
   - Click "Add Prize" for new prizes
   - Click "×" to remove prizes
   - Click "Save Prizes" to update wheel

2. **Theme Switching:**
   - Click "Switch Theme" button to toggle between themes
   - Theme preference is saved in localStorage

3. **Spinning:**
   - Click "Spin The Wheel!" to start
   - Wait for animation to complete
   - Prize is displayed in popup

## Development

The project uses vanilla JavaScript with HTML5 Canvas for rendering. Key components:
- `script.js`: Core game logic and wheel rendering
- `style.css`: Theme system and UI styling
- `index.html`: Game structure and elements