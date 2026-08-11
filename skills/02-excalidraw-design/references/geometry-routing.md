# Geometry and Routing

Use this reference during implementation and mathematical verification.

Treat text, arrowheads, labels, and rough strokes as geometry.

## Coordinate system

Use a 20-unit base grid unless an existing scene establishes another rhythm.

Snap major positions and dimensions to the grid where practical. Small optical corrections may use half-grid values.

Recommended defaults:

| Measure | Range |
|---|---:|
| Node padding | 20–28 |
| Related node gap | 40–60 |
| Major region gap | 80–120 |
| Frame padding | 48–72 |
| Title reserve | 56–80 |
| Connector clearance | 16–24 |
| Filigrane edge inset | 24–40 |

## Text measurement

Preferred order:

1. measure with the actual target font through available browser/canvas or renderer
2. use dimensions produced by the current Excalidraw API
3. use the conservative estimate below

Never claim exact measurement when using an estimate.

### Conservative fallback

For Latin text with Excalifont:

- estimated line width = `character_count × font_size × 0.62`
- estimated line height = `font_size × 1.25`

For CJK or wide glyph scripts:

- estimated line width = `character_count × font_size × 1.0`

Add a safety margin of at least 10% when no renderer is available.

Container width:

`max(line_widths) + left_padding + right_padding`

Container height:

`line_count × line_height + top_padding + bottom_padding`

For a titled card, reserve separate title and body bands.

### Line breaking

Break at semantic boundaries:

- heading
- subject/action
- condition
- qualifier
- consequence
- compact bullets

Do not break identifiers, formulas, file paths, URLs, or chemical notation unless the source format permits it.

Preferred body line length:

- compact label: 12–24 characters
- node title: 18–32 characters
- annotation: 28–52 characters

These are heuristics, not reasons to damage terminology.

## Axis-aligned bounds

For an unrotated element:

- left = `x`
- top = `y`
- right = `x + width`
- bottom = `y + height`

Inflate visible bounds by:

- half the stroke width
- roughness safety margin
- arrowhead extent
- text measurement safety margin

Use an 8–12 unit roughness margin when no render measurement is available.

## Container fitting

For children `i` with visible bounds:

- left = `min(child_left_i)`
- top = `min(child_top_i)`
- right = `max(child_right_i)`
- bottom = `max(child_bottom_i)`

Then:

- container x = `left - padding_left`
- container y = `top - title_reserve - padding_top`
- container width = `(right - left) + padding_left + padding_right`
- container height = `(bottom - top) + title_reserve + padding_top + padding_bottom`

Include:

- child text
- connector labels
- internal annotations
- arrowheads
- filigrane
- visible strokes

Do not include connectors that intentionally leave the container unless the container semantically owns them.

## Overlap test

For rectangles A and B with clearance `g`, an unintended overlap exists when:

`A.left < B.right + g`
and
`A.right + g > B.left`
and
`A.top < B.bottom + g`
and
`A.bottom + g > B.top`

Exclude intentional cases:

- containment
- bound text inside its container
- frame membership
- connector crossing a shape at its valid endpoint
- deliberate overlays approved by the composition

Use clearance:

- 16 minimum for unrelated small elements
- 24 around text-heavy nodes
- 40+ between major regions

## Boundary attachment

Connect arrows to visible boundaries, not approximate centers.

Let source center be `C = (cx, cy)` and direction toward target be `d = (dx, dy)`.

### Rectangle or rounded rectangle

With half-width `a` and half-height `b`:

`t = 1 / max(|dx| / a, |dy| / b)`

Boundary point:

`P = C + t × d`

### Ellipse

`t = 1 / sqrt((dx / a)^2 + (dy / b)^2)`

`P = C + t × d`

### Diamond

For an axis-aligned diamond:

`t = 1 / (|dx| / a + |dy| / b)`

`P = C + t × d`

Offset the endpoint outward or inward only as required by the renderer's binding gap. Keep the arrowhead visibly associated with the target.

For rotated elements or irregular shapes, use the current API/binding engine or calculate against transformed geometry. Do not use the unrotated formulas blindly.

## Connector routing

Route after nodes are fixed.

Priority:

1. direct route with no obstruction
2. gentle curve around one obstruction
3. orthogonal/elbow route through reserved lanes
4. reposition nodes
5. split the board or region

Do not solve a bad layout with excessive bends.

### Routing lanes

Reserve invisible horizontal or vertical lanes between major rows/columns.

Keep parallel edges separated by at least 12–20 units.

Enter a target from the side consistent with reading direction:

- left-to-right flow: source right, target left
- top-to-bottom hierarchy: source bottom, target top
- radial map: outward-facing sides
- feedback loop: route around the outside, not through the core

### Curves

Use curves when they:

- bypass a node cleanly
- distinguish feedback from forward flow
- connect radial structures
- reduce visual collision

Do not use curves solely for style.

### Elbows

Use elbows when they:

- clarify technical topology
- preserve rows and columns
- create stable shared routing lanes
- avoid text-heavy nodes

Avoid staircase routes with unnecessary segments.

## Arrow labels

Place labels:

- near the middle of a simple edge
- on the longest clear segment of an elbow
- offset from crossings
- outside node bounds
- with a quiet background only when needed for readability

Label the relationship, not the source or target names.

Include label bounds in collision and frame-fit checks.

## Crossing rules

Minimize crossings in this order:

1. reorder siblings
2. swap rows or columns
3. move high-degree nodes toward the center of their neighbors
4. bundle semantically identical routes only when meaning remains clear
5. use one bridge-like curve
6. separate into frames

Never hide a crossing behind a node.

## High-degree nodes

For nodes with many connections:

- distribute endpoints across multiple sides
- group edges by semantic class
- use a local hub only if it represents a real concept
- increase surrounding whitespace
- avoid a sunburst of overlapping labels

## Multi-frame consistency

Use the same:

- base grid
- node classes and dimensions
- title reserves
- connector clearance
- edge-label treatment
- semantic colors

Repeated entities should retain recognizable proportions and styling.

## Geometric completion

Before render:

- every text box fits with safety margin
- no unintended AABB overlaps remain
- frame bounds include all owned content
- arrow endpoints reach the intended boundaries
- labels avoid nodes and other labels
- routes do not pass through unrelated content
- gaps follow the selected rhythm
- filigranes fit inside their frames
