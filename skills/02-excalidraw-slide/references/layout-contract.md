# Layout Contract

Use during `BUILD` and geometric verification.

## Scene organization

Default output is one editable `.excalidraw` scene.

Arrange slide units vertically in presentation order.

Each row contains:

1. projected slide frame on the left
2. speaker-notes panel on the right

Do not put the notes panel inside the projected slide frame.

## Default dimensions

### Projected slide

- width: `1920`
- height: `1080`
- aspect ratio: `16:9`
- actual Excalidraw frame
- x-position: `0`
- frame name: `NN — <short title>`

### Speaker-notes panel

- width: `960`
- height: `1080`
- x-position: `2040`
- aligned to the same y-position as its slide
- normal grouped elements or a visually bounded panel
- not a top-level projected frame

### Row positions

For slide number `n`, starting at 1:

- `slide_y = (n - 1) × 1260`
- `notes_y = slide_y`

Vertical row gap:

- `180`

Horizontal slide-to-notes gap:

- `120`

Do not change the slide dimensions to fit content. Redesign the content.

## Naming and IDs

Use zero-padded numbers:

- `01 — Opening question`
- `02 — Trust breaks at the boundary`
- `03 — The control loop`

Suggested semantic IDs:

- `slide-01-frame`
- `slide-01-title`
- `slide-01-node-core`
- `slide-01-edge-a-b`
- `slide-01-signature`
- `notes-01-panel`
- `notes-01-text`

Use stable naming across batches.

## Projected safe area

Default insets:

- left: `120`
- right: `120`
- top: `90`
- bottom: `90`

Safe bounds within a slide positioned at `(sx, sy)`:

- left = `sx + 120`
- right = `sx + 1800`
- top = `sy + 90`
- bottom = `sy + 990`

No essential projected content may leave these bounds.

Rough strokes, arrowheads, and labels count as content.

## Title system

Default title band:

- x = safe-left
- y = safe-top
- maximum width = safe width
- nominal height = `96–140`

Use assertion titles.

Typical title size:

- `42–56` for ordinary slides
- `60–80` for section or statement slides
- reduce only after rewriting or restructuring

Reserve consistent top space across ordinary slides.

A title may be split into two lines when semantically natural.

Do not let the title collide with the main composition.

## Content region

After title reservation:

- ordinary content top: approximately `sy + 230`
- ordinary content bottom: approximately `sy + 940`

Adjust by slide type, but preserve bottom space for the filigrane.

The main visible composition should fit inside this region.

## Vertical centering

Compute the visible union of:

- primary shapes
- primary text
- connectors
- arrowheads
- essential annotations
- edge labels

Exclude:

- title
- slide number
- filigrane
- notes panel

Let composition top be `ct`, bottom be `cb`.

Let available content region top be `rt`, bottom be `rb`.

Required vertical shift:

`dy = ((rt + rb) / 2) - ((ct + cb) / 2)`

Apply `dy` to the composition and all attached labels/connectors.

Optical adjustment up to approximately `40` units is allowed when the visual mass remains unbalanced after geometric centering.

Recheck safe bounds after shifting.

## Horizontal composition

Horizontal centering is not mandatory.

Use intentional asymmetry when it improves:

- reading flow
- comparison
- hierarchy
- dramatic emphasis
- space for annotations

However, the composition must feel balanced within the frame.

Do not leave accidental dead space.

## Standard slide grammars

### Statement slide

- one dominant sentence or phrase
- optional small supporting visual
- large negative space
- notes carry nuance

### Comparison

- two or three aligned regions
- stable criteria
- equal dimensions only when comparison is truly symmetric
- differences made visible through structure before color

### Process or timeline

- one dominant direction
- no more stages than remain legible
- exception route clearly separated
- labels concise

### Architecture or system

- show only the level required for the takeaway
- use boundaries semantically
- avoid full-system diagrams on every slide
- progressively reveal complexity across slides

### Quote

Use only when exact wording is verified and rhetorically necessary.

A quote slide must include context or interpretation in notes.

### Dense visual

When a dense diagram is unavoidable:

- simplify the title
- use fewer annotations
- enlarge central structures
- move evidence and caveats to notes
- consider a follow-up detail slide

## Typography

Follow the visual system selected through `excalidraw-design`.

Default Excalifont hierarchy:

- slide title: `42–56`
- major label: `30–38`
- node title: `24–30`
- short body label: `20–26`
- tertiary annotation: `18–22`
- filigrane: `14–18`

Avoid projected text below `18`.

## Notes panel design

Notes panel default:

- Carbon or quiet neutral surface
- thin Cold Steel boundary
- title `Speaker notes — NN`
- internal padding: `48–64`
- text size: `20–24`
- section labels: `22–26`
- explicit line breaks
- no filigrane
- no projected-slide decorative motif unless it improves navigation

The notes panel may scroll conceptually, but its content must fit the actual 1080-height panel. If it does not fit, shorten notes or split the slide.

Do not reduce notes below comfortable reading size.

## Slide numbering

Use slide numbers only when useful to navigation or review.

If used:

- keep placement consistent
- make them visually secondary
- do not let numbering become decorative noise

## Filigrane reserve

Reserve a quiet lower-right area:

- inset from right: `32–48`
- inset from bottom: `24–40`
- below informational content
- inside the safe area or within a deliberately reserved bottom band

The line must never compete with slide content.

## Batch assembly

For batched implementation:

- keep the same coordinate formula
- continue slide numbering without reset
- reuse exact semantic styles
- maintain a deck ledger of dimensions and visual classes
- assemble batches into one scene
- run full-scene collision and ordering verification
