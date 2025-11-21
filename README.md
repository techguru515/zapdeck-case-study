# Circle Diagram Layout - Case Study

This is a React + TypeScript implementation of a circular diagram layout system for Zapdeck's case study.

## Overview

The diagram displays a large circle with a configurable number of small circles evenly distributed around its circumference. Each small circle is numbered clockwise and has an associated text label positioned intelligently based on its radial position. The application includes an interactive dashboard that allows users to select from multiple predefined circle configurations.

## Geometric Strategy

### Canvas and Large Circle

- **Canvas Dimensions**: Fixed at 1920 × 1080 pixels
- **Large Circle Center**: Positioned at (960, 540) - the center of the canvas
- **Large Circle Radius**: 350 pixels
  - This size was chosen to provide adequate space for labels while maintaining visual balance
  - Leaves approximately 220 pixels of margin on each side for label placement

### Small Circle Positioning

The small circles are positioned using polar coordinate mathematics:

1. **Even Distribution**: For `n` circles, the angular step between consecutive circles is `360° / n` (or `2π / n` in radians)

2. **Starting Position**: Circles are numbered starting from the top (12 o'clock position), which corresponds to -90° in standard mathematical coordinates (or 270° in 0-360° range)

3. **Position Calculation**: For each circle at index `i`:

   - Angle: `θ = -π/2 + i × (2π/n)`
   - X coordinate: `x = centerX + radius × cos(θ)`
   - Y coordinate: `y = centerY + radius × sin(θ)`

4. **Circle Size**: Each small circle has a radius equal to 1/4 of the large circle's radius (87.5 pixels)

### Numbering

Circles are numbered clockwise starting from the top position:

- Circle at top (12 o'clock) = 1
- Next circle clockwise = 2
- And so on...

## Text Label Placement Rules

The text labels follow a consistent rule based on the circle's angular position:

### Right Side (270° to 90°)

- **Position**: Label is placed to the **right** of the circle
- **Alignment**: **Left-aligned** text (`textAnchor="start"`)
- **Offset**: 20 pixels from the circle edge
- **Angles**: Includes 270° (top) through 90° (bottom), wrapping around 0°/360°

### Left Side (90° to 270°)

- **Position**: Label is placed to the **left** of the circle
- **Alignment**: **Right-aligned** text (`textAnchor="end"`)
- **Offset**: 20 pixels from the circle edge
- **Angles**: Includes 90° (right) through 270° (left)

### Implementation Details

The label positioning logic in `labelPlacement.ts`:

1. Converts the circle's angle to degrees (normalized to 0-360° range)
2. Determines if the angle falls in the right side or left side:
   - Right side: `(angle >= 270 && angle < 360) || (angle >= 0 && angle < 90)`
   - Left side: `angle >= 90 && angle < 270`
3. Calculates label position:
   - Right side: `x = circleX + (smallCircleRadius + 40)`
   - Left side: `x = circleX - (smallCircleRadius + 40)`
4. Sets text anchor accordingly:
   - Right side: `textAnchor="start"` (left-aligned)
   - Left side: `textAnchor="end"` (right-aligned)

## Technical Implementation

### Technology Stack

- **React 19.2.0**: UI framework
- **TypeScript 4.9.5**: Type safety
- **SVG**: All shapes rendered using SVG elements
- **React Scripts 5.0.1**: Build tooling and development server
- **No chart libraries**: Pure geometric calculations

### Project Structure

```
circle-diagram/
├── src/
│   ├── components/
│   │   └── CircleDiagram.tsx      # Main diagram component
│   ├── pages/
│   │   ├── Dashboard.tsx          # Main application page with selector
│   │   └── Dashboard.css          # Dashboard styling
│   ├── utils/
│   │   ├── geometry.ts            # Position calculation logic
│   │   ├── labelPlacement.ts      # Label positioning logic
│   │   └── circles.ts             # Predefined circle set data
│   ├── index.tsx                  # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

### Component Architecture

1. **`CircleDiagram.tsx`**:

   - Main component that renders the SVG diagram
   - Accepts an array of `CircleItem` objects as props
   - Handles all rendering logic for circles, numbers, and labels

2. **`Dashboard.tsx`**:

   - Main application page with interactive dropdown selector
   - Displays current circle set information
   - Manages state for selected circle configuration

3. **`geometry.ts`**:

   - `calculatePositions()`: Computes the position and angle for each small circle
   - TypeScript interfaces: `CirclePosition`, `CircleItem`

4. **`labelPlacement.ts`**:

   - `getLabelPosition()`: Determines label position and alignment based on circle angle
   - TypeScript interface: `LabelPosition`

5. **`circles.ts`**:
   - Predefined circle set data
   - Contains 8 different configurations (2-9 circles)
   - Each set includes a name and array of items with id and label

## Circle Set Configurations

The application includes 8 predefined circle set configurations:

1. **2 Circles - Minimal**: Simple two-circle layout
2. **3 Circles - Basic**: Three-circle configuration
3. **4 Circles - Standard**: Four-circle layout (cardinal directions)
4. **5 Circles - Short Labels**: Five circles with short labels (Alpha, Beta, etc.)
5. **6 Circles - Medium Labels**: Business-related terms (Product, Marketing, etc.)
6. **7 Circles - Mixed Labels**: Combination of short, medium, and very long labels
7. **8 Circles - Long Labels**: Longer descriptive labels (Customer Acquisition, Revenue Growth, etc.)
8. **9 Circles - Maximum**: Maximum supported circles with various label lengths

Users can switch between configurations using the dropdown selector in the Dashboard interface.

## Running the Application

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd circle-diagram
npm install
```

### Development Server

```bash
npm start
```

The application will open at `http://localhost:3000` in your default browser.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Running Tests

```bash
npm test
```

## Design Decisions

1. **Large Circle Radius (350px)**: Chosen to balance visual prominence with label space. This provides ~220px margin on each side for labels.

2. **Label Offset (40px)**: Provides visual separation between circles and labels without excessive spacing.

3. **Starting Position (Top)**: Starting from the top (12 o'clock) provides a natural reading flow and is intuitive for users.

4. **Label Positioning Logic**: Labels are positioned on the right side for the top and bottom quadrants (270°-90°), and on the left side for the left and right quadrants (90°-270°). This ensures labels are always positioned away from the center of the diagram.

5. **Fixed Canvas Size**: The 1920×1080 canvas matches standard slide dimensions and provides a consistent rendering environment.

6. **Interactive Dashboard**: The dropdown selector allows users to easily explore different circle configurations without code changes.

7. **SVG Rendering**: Using SVG ensures crisp rendering at any scale and provides precise control over positioning and styling.

## Limitations and Future Enhancements

### Current Limitations

- **No Dynamic Scaling**: Canvas size is fixed at 1920×1080 as per requirements
- **No Collision Avoidance**: Labels may overlap with very long text
- **No Interactivity**: No hover effects or click handlers (as per requirements)
- **Fixed Font Sizes**: Text sizes are fixed and don't scale with diagram size
- **Maximum Circles**: Supports 2-9 circles as per requirements

### Potential Enhancements for Production Use

- Collision detection and label repositioning
- Dynamic font sizing based on available space
- Support for more than 9 circles
- Responsive scaling for different screen sizes
- Animation support for dynamic updates
- Export functionality (PNG, SVG, PDF)
- Custom label editing interface
- Drag-and-drop circle reordering

## Testing

The implementation has been tested with:

- All 8 predefined circle sets (2 to 9 circles)
- Various label lengths (short, medium, long, mixed)
- Different combinations of label lengths
- SVG rendering across different browsers

All scenarios render correctly with proper circle distribution and label positioning according to the geometric rules.
