# Top Artifact / Glitch Layer

## Mandatory principle

Every visual output using this skill must include a **topmost artifact layer**: a distinct surface treatment above the clean design.

The artifact layer may be animated or static. It must be visible enough to register as intentional, but it must never become the primary content layer.

Conceptually:

`CONTENT → UI / LAYOUT → BRAND → TOP ARTIFACT / SIGNAL DAMAGE`

The clean artifact must remain coherent beneath the damage.

## What the layer can contain

Use a restrained combination of:

- thin scanlines.
- tiny grain/noise.
- short horizontal displacement bands.
- RGB/channel separation in isolated regions.
- blue/green/orange edge ghosts.
- narrow compression tears.
- intermittent pixel blocks.
- clipped diagonal fragments.
- frame jitter.
- line dropouts.
- tiny signal labels or timing marks when semantically appropriate.

Do not use all of them at once.

## Visual hierarchy

The top layer should generally be lower contrast than the content it crosses.

Good pattern:

- permanent subtle grain/scanline texture.
- one or two visible static glitch scars.
- occasional stronger animated pulse when motion exists.

Bad pattern:

- permanent 20px RGB separation on all text.
- moving noise over every paragraph.
- constant full-canvas shake.
- strobing orange/green flashes.

## Color behavior

Use the brand colors as channel ghosts:

- Blue `#003B6F` = structural echo.
- Green `#00FF66` = live-signal ghost.
- Orange `#FF8C00` = anomaly tear.

White can appear as a brief clipping flash. Magenta/cyan should not become dominant unless the underlying content specifically requires them.

## Animation behavior

When motion is available, prefer **rare, sharp events** over constant chaos.

Suggested rhythm ranges, adapted to medium:

- Ambient drift: very slow, barely visible.
- Micro displacement: roughly 40–140 ms.
- Glitch event: short burst, then silence.
- Major transition corruption: brief, once per scene/section rather than continuously.

Vary timing enough that the effect does not feel like a looping GIF unless a loop is the intended artifact.

## Reduced motion

Where `prefers-reduced-motion` or equivalent accessibility controls exist:

- remove jitter and repeated displacement.
- freeze animated scanlines.
- keep a static grain or one non-moving artifact scar so the visual language remains present.
- never remove the entire top layer unless the user explicitly requests a clean mode.

## Medium-specific translation

### Web / app

Use a separate overlay element above the full visual surface. It should usually:

- be `pointer-events: none`.
- avoid intercepting focus.
- use pseudo-elements, masks, gradients, noise images, blend modes, or clip paths.
- keep strong artifacts away from live text and controls.
- degrade gracefully if filters or blend modes are unavailable.

`assets/glitch-overlay.css` contains one optional implementation reference. It is not mandatory architecture.

### Document / PDF / print

Use static treatment:

- a faint scanline field.
- 1–2 cropped displacement bands per page or spread.
- edge noise or registration marks.
- small channel-offset fragments near section transitions.

Do not run artifact bands through long reading passages.

### Slides

Keep the slide body clean. Put the stronger artifact layer:

- near edges.
- over image crops.
- around transitions.
- in the title frame.

One strong glitch scar per slide is usually enough.

### Image / poster

The top layer may become more expressive, but typography and logo must remain recoverable.

Use masks so damage can be strongest in negative space and weaker over content.

### Video / GIF

Treat glitch as editing grammar:

- transition hit.
- frame tear.
- UI lock-on.
- signal drop.
- color-channel ghost.

Avoid constant shake. Include stable frames so the viewer can actually perceive the design.

### Diagram / data visualization

Keep the data layer pristine. Apply artifacts mostly to framing, background, titles, and scene edges. Never distort values, axes, labels, or marks that affect interpretation.

## Logo interaction

The artifact layer may cross the logo temporarily, but:

- the base mark stays untouched.
- no permanent deformation.
- no heavy blur.
- no fill pattern that breaks recognition.
- no orange warning treatment unless the surrounding context is explicitly an alert state.

## Intensity scale

Use this shorthand when handing off to the design skill:

- **G1 — clean signal:** faint grain + one static scar.
- **G2 — active system:** visible scanline texture + occasional narrow displacement.
- **G3 — hostile signal:** stronger band tears, short chromatic ghosts, still readable.
- **G4 — corruption event:** transitional or dramatic moment only; never persistent for normal reading/operation.

Default to **G2** unless the user asks for cleaner or more aggressive treatment.
