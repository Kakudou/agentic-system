# Source-Led Visual System

Use this reference only for visual decisions the user and source have not already resolved.

User direction and source-specific visual language always take priority when compatible with readability and truth.

## Principle

Let structure and subject determine the visual system.

Build a small coherent grammar from:

- one canvas/background treatment;
- one primary text/boundary color;
- one secondary/context color;
- one or two semantic accents at most;
- stable shape meanings;
- consistent typography, spacing, and connector semantics.

Do not import a genre, brand, or mood merely because styling is unspecified.

## Neutral Fallback

When the source provides no stronger signal, use a restrained editorial/technical treatment:

- high contrast and legibility;
- neutral light or dark canvas chosen for the content;
- low-saturation surfaces;
- one restrained emphasis accent;
- one warning/exception accent only when the content actually contains a warning or exception;
- clean hierarchy and generous negative space;
- hand-drawn Excalidraw character without decorative noise.

The fallback should disappear behind the information rather than become the subject.

## Semantic Color Rules

- A color must mean the same thing throughout one board set.
- Meaning outranks visual balance.
- Do not assign a unique color to every category.
- Prefer position, shape, label, boundary, or line style before adding another color.
- Use a warning color only for a real warning, failure, threat, contradiction, or destructive path.
- Show uncertainty through qualification and reduced emphasis, not an arbitrary hue.
- Keep active accents sparse enough that emphasis remains meaningful.

## Canvas and Surfaces

Choose a light or dark canvas from the approved direction and source needs.

Use surfaces only to express real regions, containment, hierarchy, or focus. Large areas may remain unfilled when whitespace is clearer.

For nested regions:

- outer boundary: low-emphasis primary or secondary stroke;
- inner zone: subtle fill or no fill;
- active region: emphasis through boundary, label, or position before saturated fill.

## Strokes

Default unless the approved direction requires otherwise:

- `strokeStyle`: solid;
- `strokeWidth`: 1;
- `roughness`: 1;
- `opacity`: 100.

Use thicker strokes only for a primary spine, major boundary, deliberately emphasized route, or title device.

Dashed or dotted strokes must encode uncertainty, planned state, indirect relationship, or another declared semantic convention. Never use them only as texture.

## Shapes and Boundaries

Prefer shapes for meaning:

- rounded rectangles for general concepts, components, actors, and notes;
- diamonds only for real decisions, constraints, forks, or tests;
- ellipses for events, cycles, external actors, or conceptual foci when appropriate;
- frames for top-level boards and navigable regions;
- lines for boundaries or undirected relationships;
- arrows for directed relationships.

Define shape semantics per artifact and keep them stable.

Do not add shape variety merely for decoration.

## Typography

Use Excalifont unless the user or existing scene requires another font.

When writing native Excalidraw JSON, use the verified Excalifont family value supported by the target environment. If editing an existing scene, preserve its verified font-family convention rather than guessing a numeric identifier.

Suggested hierarchy:

- board title: 32–40;
- region title: 24–28;
- node title: 18–22;
- body or annotation: 16–18;
- tertiary note: 14–16.

Do not shrink core information below 16 merely to avoid restructuring.

Use short headings, explicit line breaks, left alignment for prose, and centered text only for compact labels or focal nodes.

## Spacing Rhythm

Use a 20-unit base grid unless the source or existing scene establishes another rhythm.

Typical intervals:

- text-to-container padding: 20–28;
- related node gap: 40–60;
- major region gap: 80–120;
- frame padding: 48–72;
- title reserve inside frame: 56–80.

Consistency matters more than exact numbers.

## Connectors

Default connectors are thin, clear, and semantically directed.

- curve a connector when it clarifies hierarchy or bypasses congestion;
- use orthogonal routing when it clarifies a technical structure;
- use arrowheads only where direction is real;
- keep relationship labels concise;
- reserve accent colors for meaningful active/recommended/exception paths.

Change layout before adding routing complexity when crossings become dense.

## Source-Specific Signature Device

Each proposed direction should contain one defensible visual move derived from the material, such as:

- a system spine that also expresses chronology;
- a trust boundary shaped by actual domains;
- a motif derived from source artifacts;
- a contradiction made spatially visible;
- a layered reveal;
- a route through a real process or dependency structure.

The device must improve comprehension. It cannot be generic decoration.

## Prohibited Defaults

Do not introduce by default:

- a private brand palette;
- cyberpunk, corporate, playful, cinematic, brutalist, retro, luxury, or other genre styling;
- gradients, glow, or heavy effects without an approved reason;
- fake warnings, codes, terminal logs, glyphs, or serial numbers;
- ornamental circuit traces or other subject-detached motifs;
- rainbow category coding;
- large saturated fills;
- maker signatures or watermarks.

If one of these choices is source-supported or explicitly requested, it may be part of an approved direction.

## Optional Maker Mark

Add a signature, watermark, or maker mark only when the user explicitly requests one.

Keep it visually subordinate, fully contained, and collision-free. Do not invent a slogan or signature identity on the user's behalf.
