# Output Adaptation Guide

## Principle

This design language is **medium-independent**. Preserve the visual grammar, not a particular component library or page layout.

For every task, first ask: what does this medium do best?

Then translate the system into that medium.

## Website / web application

Prioritize:

- responsive hierarchy.
- readable dark surfaces.
- blue structural navigation/frame language.
- green active/focus states.
- orange warning/destructive states.
- one memorable interactive signature.
- a non-interactive top glitch overlay.
- reduced-motion fallback.

Avoid turning every section into a boxed HUD card.

## Dashboard / operational UI

Let data density be real.

Use:

- blue for baseline structure.
- green for active/current/healthy.
- orange for exceptions and thresholds.
- mono utility text for IDs and measurements.
- restrained framing around groups that have actual semantic boundaries.

Do not distort data with the glitch layer.

## Document / report / PDF

Translate the aesthetic into editorial structure:

- blue rules and section framing.
- condensed display headings.
- clean body typography.
- utility metadata labels.
- high-contrast dark cover or section openers.
- static signal artifacts in margins, dividers, or image zones.

Do not force dark backgrounds on every page if it harms long-form reading or print practicality. The brand can survive through blue geometry, typography, and artifact marks on light paper.

## Slide deck

Use a strong slide master language without overboxing:

- blue edge frame or section rail.
- green highlight for the current thesis/data point.
- orange for risk or exception.
- large condensed headline.
- technical footer / page ID.
- one top-layer glitch scar or transition treatment.

A slide should still communicate one dominant idea.

## Poster / static image

You can push atmosphere farther:

- larger geometric frame.
- stronger image treatment.
- visible grain and scanline field.
- bolder clipping bands.
- oversized type.
- logo used as a stamp or anchor.

Keep one clean focal region.

## Diagram / architecture map

Use the palette semantically:

- blue = structural paths / system groups.
- green = current flow / active route / valid state.
- orange = exception / warning / risky dependency.
- gray = contextual or inactive structure.

Angular connectors and frame notches can carry style, but relationship clarity comes first.

## Video

Think in scenes and signal states:

- clean establishing frame.
- blue environmental chassis.
- green activation moment.
- orange anomaly or counterpoint.
- glitch as transition grammar.
- stable dwell time for legibility.

Use sound only if appropriate; visual comprehension should not depend on sound alone.

## GIF / short loop

Build a loop with a clear resting state. The glitch should punctuate the loop, not occupy every frame.

A good loop often follows:

1. clean state.
2. activation.
3. one corruption event.
4. resolve.
5. hold.

## Social / marketing graphic

Keep the brand immediately legible at thumbnail size:

- large headline.
- one decisive blue frame.
- green or orange single-point accent.
- simplified artifact overlay.
- large clear logo mark.

Do not shrink desktop UI into a poster.

## Terminal / CLI presentation

Use the language through text hierarchy rather than fake graphics:

- blue-equivalent ANSI for structure when color is available.
- green for success/live.
- orange/yellow family for warning.
- box-drawing characters or angular ASCII sparingly.
- one glitch-style separator or transient redraw if the terminal supports it.

Plain-text fallback must remain readable.

## Non-visual / highly constrained media

If the requested output cannot literally support a visual overlay, preserve the idea as a **top-level framing motif**: a brief signal-corruption header, divider, metadata pattern, or other medium-native artifact. Do not force meaningless decoration that harms the deliverable.

## Choosing intensity

Match the level to context:

- Enterprise/internal report → cleaner, G1–G2.
- Product UI → G1–G2 with a stronger signature interaction.
- Marketing landing page → G2 with one G3 moment.
- Poster/artwork → G2–G3.
- Video transition / reveal → G3–G4 briefly.

Never let a persistent G4 state become the default interface.
