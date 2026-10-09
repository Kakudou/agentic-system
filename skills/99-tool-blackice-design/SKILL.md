---
name: 99-tool-blackice-design
description: Applies the Black Ice visual design language to any requested artifact or experience: deep TARDIS blue (003B6F) structural framing, lightsaber green active accents, lightsaber orange warnings, dark industrial surfaces, angular HUD geometry, disciplined neon, the supplied geometric brand mark, and an always-present top artifact/glitch layer. Use for visual direction, UI, websites, documents, slides, posters, images, motion, video, GIFs, dashboards, diagrams, or other designed outputs. Delegates design execution to 98-external-frontend-design.
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Black Ice Design Language

This skill is an **art-direction layer**, not an artifact generator tied to one format.
It defines the visual system, brand constraints, atmosphere, motion language, and quality bar to inject into whatever the user asks to create.

The requested output can be almost anything: a website, application, dashboard, document, PDF, slide deck, image, poster, diagram, video, GIF, animation, report, terminal experience, social asset, or another medium. **Never assume HTML or any other output format unless the user asks for it.**

## Mandatory dependency

Before crafting recommendations or producing the final artifact, **invoke `98-external-frontend-design`** and use it as the design/execution skill.

Preferred resolution order:

1. If the host supports skill invocation by name, invoke `98-external-frontend-design`.
2. Otherwise read and apply `../98-external-frontend-design/SKILL.md`.
3. If neither is available, state that the dependency is unavailable before proceeding; do not silently pretend it was used.

This skill supplies the visual brief and non-negotiable design constraints. The dependency supplies the broader design process, originality checks, implementation discipline, accessibility floor, and artifact-specific execution strategy.

## Core intent

Create an original, recognizable **neon-industrial / black-ice interface language** inspired by late-dystopian cybernetic UI aesthetics without copying proprietary game logos, exact screens, characters, typefaces, or identifiable artwork.

The visual identity is built around:

- **Deep TARDIS blue `#003B6F`** as the dominant structural and brand accent.
- **Lightsaber green `#00FF66`** for live state, active interaction, positive signal, targeting, and energized highlights.
- **Lightsaber orange `#FF8C00`** for warnings, heat, caution, anomaly, urgency, and deliberate contrast.
- Near-black / gunmetal surfaces and cool fog-gray typography.
- Angular framing, clipped corners, technical linework, asymmetry, layered planes, sparse glow, and high information density where appropriate.
- A **topmost artifact/glitch layer in every visual output**, animated when the medium supports it and static when it does not.
- The supplied geometric mark as the brand anchor; preserve its geometry.

## Read references progressively

Read only what the task needs, but treat the mandatory rules below as always active:

- Full visual system: [references/DESIGN-SYSTEM.md](references/DESIGN-SYSTEM.md)
- Top artifact/glitch layer: [references/GLITCH-LAYER.md](references/GLITCH-LAYER.md)
- Logo and mark usage: [references/LOGO.md](references/LOGO.md)
- Adapting the language to arbitrary media: [references/OUTPUT-ADAPTATION.md](references/OUTPUT-ADAPTATION.md)
- Handoff contract for `98-external-frontend-design`: [references/HANDOFF.md](references/HANDOFF.md)

Reusable assets live in `assets/`:

- `assets/logo-original.png` — original supplied raster.
- `assets/logo-black-transparent.png` — cleaned transparent master in black.
- `assets/logo-white-transparent.png` — light version for dark surfaces.
- `assets/logo-blue-transparent.png` — primary brand-blue version.
- `assets/logo-green-transparent.png` — energized accent version.
- `assets/logo-orange-transparent.png` — warning/accent version; use sparingly.
- `assets/style-cheatsheet.png` — visual calibration reference.
- `assets/design-tokens.json` — portable semantic tokens.
- `assets/glitch-overlay.css` — optional web implementation reference; not a required output format.

## Non-negotiable rules

### 1. Blue owns the structure

`#003B6F` is the visual backbone: frames, separators, key headings, geometric anchors, navigation structure, diagrams, major strokes, or environmental light. Green and orange are **signals**, not co-equal wallpaper colors.

The composition should still feel dark. Do not flood the canvas with flat blue. Think **black field + blue architecture + green life + orange danger**.

### 2. Green means active energy

Use `#00FF66` for active states, confirmed state, terminal-like data, live telemetry, cursor/focus moments, positive status, selected/high-value information, or a small luminous hero accent.

Avoid covering large surfaces with it. It should feel electrically expensive.

### 3. Orange means heat / warning / anomaly

Use `#FF8C00` for warnings, destructive confirmation, unusual state, alert borders, hot data, caution, or one counterpoint in visual storytelling.

Do not use orange as generic decoration. Its presence should mean something.

### 4. Geometry is sharp and purposeful

Favor clipped corners, chamfers, cutouts, stepped dividers, line brackets, diagonal interruptions, asymmetric panel edges, and layered technical framing.

Avoid default pill buttons, soft SaaS cards, gratuitous glassmorphism, generic gradient blobs, and rounded-everything UI. Rounded geometry is allowed only when the subject or function genuinely demands it.

### 5. Neon is punctuation

Most of the artifact should remain restrained: dark surfaces, cool text, thin framing, negative space. Glow appears around a small number of decisive elements.

If everything glows, nothing feels powered.

### 6. The artifact/glitch layer always exists

Every visual deliverable must carry a **separate top-layer artifact treatment**. It may be animated or static, but it must be perceptible without damaging usability.

Read [references/GLITCH-LAYER.md](references/GLITCH-LAYER.md) before implementing it.

### 7. The logo stays legible beneath the damage

Use the supplied logo variants from `assets/`. Preserve proportions and silhouette. Temporary chromatic displacement or scanline breakup may pass over it as part of the top artifact layer, but the base mark itself must remain crisp and recognizable.

### 8. Content wins

Do not fake technical density. HUD marks, IDs, coordinates, status blocks, numbers, timelines, grids, or data labels should encode real structure or useful context whenever possible. Decorative telemetry is a last resort and should stay subtle.

## Execution workflow

1. **Resolve the actual request.** Identify the artifact, audience, purpose, content, viewing context, technical constraints, and whether motion is possible.
2. **Invoke `98-external-frontend-design`.** Use its brainstorm → critique → build → critique discipline.
3. **Assemble the Black Ice brief.** Read the relevant references and map the palette, typography roles, geometry, logo, texture, and artifact layer to the requested medium.
4. **Choose one signature moment.** The design skill asks for a memorable signature; make it specific to the subject while keeping this visual language. The signature is not automatically “more glitch.”
5. **Build for the medium.** Do not force web metaphors into print, slide conventions into video, or motion into a static format.
6. **Apply the artifact layer last.** It must sit conceptually above the clean design, like signal corruption affecting a functioning system.
7. **Critique twice.** First for genericness, then for excess. Remove any decoration that does not improve hierarchy, atmosphere, storytelling, navigation, or brand recognition.
8. **Verify accessibility and fallback behavior.** Readability, contrast, keyboard focus where relevant, reduced motion, captions where relevant, and static alternatives are part of the design.

## Output behavior

Do **not** hard-code the artifact type in this skill. When the user has specified a format, honor it. When they have not, let `98-external-frontend-design` recommend the medium or implementation that best satisfies the actual goal.

The final output should feel like the same visual world across media, not like the same HTML page mechanically exported everywhere.

## Completion checklist

Before final delivery confirm all of the following:

- The dependency skill was invoked/applied.
- `#003B6F` clearly owns the structural identity.
- Green and orange have semantic jobs.
- Dark surfaces and cool neutral text keep contrast under control.
- Typography has distinct display/body/utility roles where the medium supports typography.
- Geometry is angular and intentional rather than generic sci-fi decoration.
- The supplied mark is handled according to `references/LOGO.md` when branding is appropriate.
- A top artifact/glitch layer is present.
- Motion has a reduced/static fallback where relevant.
- The artifact remains readable and usable when the effects are ignored.
- No proprietary Cyberpunk 2077 artwork, logos, exact UI screens, or exact type treatments were copied.
