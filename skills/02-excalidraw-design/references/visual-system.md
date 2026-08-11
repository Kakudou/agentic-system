# Visual System

Use this reference for all visual decisions the user has not specified.

User-provided style always wins when it is compatible with readability and source truth.

## Intent: Black-Ice cartography

The default mood is restrained terminal noir: decker field notes, black-market infrastructure maps, worn technical intelligence, hostile systems, and analog marks over a cold digital substrate.

It should feel:

- tactical rather than theatrical
- dangerous through implication rather than glow
- hand-drawn but controlled
- dense with meaning, not ornament
- urban, cybernetic, weathered, and precise
- native to Excalidraw

It is not:

- vaporwave
- synthwave
- neon nightlife
- cyan/magenta spectacle
- glossy science-fiction HUD
- generic dark dashboard
- decorative circuit-board wallpaper
- random glyphs, fake terminal logs, or meaningless serial numbers

Atmosphere must come from information design: cable-like routes, asymmetric balance, compressed annotation, boundaries, crossings avoided under pressure, and a slight human instability.

## Core palette

| Semantic role | Name | Hex | Meaning |
|---|---|---:|---|
| Canvas | Black Ice | `#0B0E11` | hostile void; primary background |
| Surface | Carbon | `#151A1F` | frames, quiet zones, grouped regions |
| Primary | Dead Paper | `#D6D1C7` | verified facts, primary text, main boundaries |
| Secondary | Cold Steel | `#7F8B94` | context, dormant links, secondary labels |
| Focus | Burned Amber | `#C58A3A` | insight, active path, control, decisive mechanism |
| System | Oxide Teal | `#3E7C74` | data, stable systems, technical structure |
| Exception | Dried Blood | `#A34A46` | threat, failure, conflict, corruption, destructive path |

Foundation:

- approximately 80% Black Ice and Carbon
- approximately 15% Dead Paper and Cold Steel
- no more than 5% active accents

Use at most two active accents on a normal board. `Dried Blood` is not a decorative accent; use it only when the content contains an actual warning, failure, threat, contradiction, or hostile relationship.

## Semantic color rules

- A color must mean the same thing throughout a board set.
- Meaning outranks visual balance.
- Do not assign a unique color to every category.
- Prefer shape, position, labels, or boundary before adding another color.
- Uncertain content should use qualification and reduced emphasis, not an arbitrary hue.
- Never use red merely to make a board feel cyberpunk.

## Prohibited styling

- gradients
- glow or bloom
- bright cyan with magenta
- decorative purple haze
- rainbow coding
- large saturated fills
- equal distribution of accents
- ornamental circuit traces
- fake warnings or system codes
- excessive dashed borders
- polished corporate diagram aesthetics

## Canvas and surfaces

Default canvas: `#0B0E11`.

Use Carbon surfaces sparingly to distinguish true zones or frames. Large areas may remain unfilled so the canvas carries the composition.

For nested regions:

- outer frame: low-emphasis Dead Paper or Cold Steel boundary
- inner zone: Carbon fill or no fill
- important active region: Burned Amber boundary or label, not a saturated block

## Strokes

Default:

- `strokeStyle`: solid
- `strokeWidth`: 1
- `roughness`: 1
- `opacity`: 100

Use stroke width 2 only for:

- the primary system spine
- the most important boundary
- a deliberately emphasized route
- the principal title device

Avoid width 3+ unless the user explicitly requests a heavier visual language.

Dashed or dotted strokes must encode uncertainty, planned state, indirect relationship, or a domain-specific convention. Never use them for texture.

## Shapes and boundaries

Prefer:

- rounded rectangles for most concepts, components, actors, and notes
- diamonds only for actual decisions, constraints, forks, or tests
- ellipses for events, cycles, external actors, or conceptual foci when semantically appropriate
- frames for top-level boards and navigable regions
- lines for boundaries or undirected relationships
- arrows for directed relationships

Define shape semantics per artifact and keep them stable.

Do not use a diamond because a flowchart “needs variety.”

## Typography

Use Excalifont for all text unless the user requires another font.

When writing native Excalidraw JSON, use the current Excalifont family value supported by the target environment. If the environment exposes named constants, use the named Excalifont constant. If editing an existing scene, copy the verified Excalifont `fontFamily` value from that scene. Do not guess a numeric font identifier when it cannot be verified.

Suggested hierarchy:

- board title: 32–40
- region title: 24–28
- node title: 18–22
- body or annotation: 16–18
- tertiary note: 14–16
- filigrane: 12–14

Do not shrink core information below 16 merely to avoid restructuring.

Use:

- short headings
- sentence case or restrained uppercase
- explicit line breaks
- left alignment for prose
- centered text only for compact labels or focal nodes

## Spacing rhythm

Use a 20-unit base grid unless the source or existing scene establishes another rhythm.

Typical intervals:

- text-to-container padding: 20–28
- related node gap: 40–60
- major region gap: 80–120
- frame padding: 48–72
- title reserve inside frame: 56–80

Consistency matters more than exact numbers.

## Connectors

Default connectors:

- thin solid wire
- moderate roughness
- curved when a curve clarifies hierarchy or bypasses congestion
- elbowed when orthogonal routing clarifies a technical system
- arrowheads only where direction is real
- concise relationship labels

Use Burned Amber for one active or recommended path. Use Oxide Teal for stable data or system flow. Keep ordinary dependencies in Dead Paper or Cold Steel.

## Signature device

Each direction should contain one source-specific, defensible visual move, such as:

- a system spine that also expresses chronology
- a trust boundary shaped by actual domains
- a repeated motif derived from the subject's artifacts
- a central contradiction made spatially visible
- a layered “black box” reveal
- an annotated route through hostile infrastructure

The signature device must improve comprehension. It cannot be generic cyberpunk decoration.

## Ōtsumi filigrane

Format:

`<punchline> — Ōtsumi`

Rules:

- unique per board
- derived from the board thesis
- 12 words maximum before signature
- placed near lower-right when possible
- fully inside the top-level frame
- no overlap with connectors or content
- Cold Steel or Dead Paper
- visually subordinate to tertiary notes
- target opacity: 14–20%, adjusted only to remain subtly legible

Do not reuse stock slogans. The line should feel like a quiet blade left in the margin.
