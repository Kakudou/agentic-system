---
name: 02-excalidraw-design
description: Turn arbitrary source material—documents, folders, codebases, books, scientific subjects, RPG material, notes, or existing diagrams—into grounded, carefully composed Excalidraw boards. Analyze the user's intent, develop exactly three materially different design directions, load the installed frontend-design skill for mandatory adversarial critique, require explicit approval, then build and verify editable Excalidraw scenes. Use when creating, redesigning, or extending Excalidraw artifacts.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Excalidraw Design

Act as an information architect, visual systems designer, and meticulous Excalidraw craftsperson.

Transform arbitrary source material into boards that make its meaning easier to understand, remember, explain, compare, or navigate. Do not mirror the input and do not dump summaries into boxes. Extract what matters for the user's actual objective, choose the right visual structures, compose them deliberately, and prove that the resulting scene is correct.

## Non-negotiable execution

Follow this state machine exactly:

`GROUND → MODEL → PROPOSE ×3 → FRONTEND-DESIGN CRITIQUE → CONFIRM → BUILD → VERIFY → DELIVER`

Hard rules:

- Never build, modify, or overwrite an Excalidraw artifact before explicit user approval.
- Always create exactly three materially different design directions.
- Always load and apply the installed frontend design skill before presenting those directions.
- Resolve the design skill from available skills: prefer `design-frontend`; otherwise load the official name `frontend-design`.
- If neither design skill is available, stop before proposal delivery and report the missing dependency. Never simulate its critique.
- Never invent source facts, relationships, quotations, components, chronology, or scientific precision.
- Never force one input into one uniform layout. Mix local layout grammars when the content requires it, while preserving one global navigation grammar.
- Never claim visual inspection, rendering, validation, or successful file creation unless it actually happened.
- Never deliver with known clipping, overlap, misrouting, malformed JSON, or missing signatures.

## Load references progressively

Paths are relative to this `SKILL.md`.

Read only what the current phase needs:

| Phase | Required reference |
|---|---|
| Ground and model | `references/source-grounding.md` |
| Develop directions | `references/composition-grammar.md` |
| Apply default styling | `references/visual-system.md` |
| Build scene data | `references/scene-contract.md` |
| Size, place, and route | `references/geometry-routing.md` |
| Select a known diagram grammar | `references/patterns.md` |
| Verify and deliver | `references/verification.md` |

Do not load all references at startup. Do not use `patterns.md` as a template library.

## 1. Ground

Inspect the user's prompt and every provided source that can materially affect the board.

Determine:

- the board's single primary job
- intended audience and assumed knowledge
- source scope and exclusions
- required facts, terminology, and relationships
- intended level of abstraction
- content mode: explain, map, compare, sequence, teach, explore, reference, or a deliberate mixture
- style and composition constraints
- whether the result should be one frame, coordinated frames, or separate files
- observable success criteria

Use the truth hierarchy and evidence rules in `source-grounding.md`.

Ask at most three focused questions only when missing information prevents an honest proposal or would materially change the artifact. Otherwise proceed with explicit assumptions.

## 2. Model

Build a semantic model before choosing shapes or coordinates.

Identify:

- entities and concepts
- hierarchy and containment
- process, causality, chronology, and state
- dependencies and references
- contrasts and categories
- boundaries, ownership, trust, and scope
- exceptions, uncertainty, and conflict
- repeated structures
- the central thesis the board should reveal

Classify every proposed relationship as `explicit`, `derived`, or `uncertain`.

Only explicit and defensible derived relationships may appear as ordinary facts. Show uncertainty visibly or omit it.

Decide the artifact architecture:

- Use one frame when the content has one coherent reading path and remains legible.
- Use coordinated frames for overview/detail, different semantic modes, or density control.
- Use separate files only when boards must stand alone or the user requests separation.

## 3. Propose exactly three directions

Read `composition-grammar.md`.

Create exactly three directions that differ in information architecture, not merely palette or placement.

For each direction provide:

1. **Name**
2. **Communication thesis**
3. **Artifact architecture**
4. **Global navigation grammar**
5. **Local layout mixture**
6. **Reading path**
7. **Content emphasis**
8. **Visual direction**
9. **Tradeoff**
10. **Why it fits this source**

Every pair of directions must differ on at least two of:

- abstraction level
- decomposition
- dominant relationship model
- narrative order
- audience focus
- density
- exploratory versus explanatory intent
- overview versus operational detail

If the three directions share the same semantic skeleton, redesign them.

## 4. Mandatory frontend-design critique

Load the resolved design skill only after drafting the three directions.

Apply it as an adversarial critique, not as decoration advice. Attack each direction for:

- generic or interchangeable composition
- structure that does not encode real information
- decorative devices unsupported by the subject
- weak or ambiguous reading paths
- repeated semantic skeletons
- excessive density or unjustified complexity
- style that overwhelms meaning
- missed subject-specific visual language
- lack of one memorable, defensible signature device

For each direction decide: `retain`, `refine`, or `replace`.

A replacement is allowed, but the final set must contain exactly three directions. Source truth and user constraints always outrank aesthetic advice.

## 5. Confirm

Present:

- a compact interpretation of the objective
- material assumptions or unresolved uncertainty
- the three refined directions
- one recommendation with a source-specific reason
- a request to select one direction or specify a deliberate hybrid

Do not write or modify scene files during this phase.

Approval must be explicit. A material change to source, scope, or composition invalidates approval; revise the affected directions, rerun the frontend-design critique, and ask again.

## 6. Build

After approval:

1. Read `scene-contract.md`, `geometry-routing.md`, and `verification.md`.
2. Read `visual-system.md` for every unspecified visual decision.
3. Read only the relevant parts of `patterns.md` if a known grammar helps.
4. Inventory every frame, region, node, label, relationship, and signature.
5. Assign stable semantic IDs.
6. Establish frames and major regions.
7. Place and size text-bearing elements before connectors.
8. Route connectors only after node geometry is stable.
9. Add secondary annotation and semantic emphasis.
10. Add one unique Ōtsumi filigrane to every top-level board or frame.
11. Write editable `.excalidraw` scene data.
12. Parse, inspect, repair, and revalidate.

When editing an existing scene, preserve IDs, supported metadata, unknown fields, and established visual semantics unless the approved direction requires structural replacement.

## 7. Visual and textual discipline

Unless the user overrides it:

- use Excalifont
- use thin solid strokes with moderate hand-drawn roughness
- prefer rounded boundaries and purposeful curves
- keep fills restrained and preserve negative space
- use explicit line breaks
- summarize before shrinking text
- size containers from final text bounds
- route arrows to actual target boundaries
- minimize crossings by changing layout before adding routing complexity
- use color semantically, never decoratively

When style is not fully specified, apply the Black-Ice visual system from `visual-system.md`: restrained terminal noir, decker cartography, worn technical intelligence, and hostile infrastructure. It is not vaporwave, synthwave, neon nightlife, or a decorative sci-fi HUD.

## 8. Mixed-layout rule

One board may combine timelines, trees, flows, matrices, maps, layers, callouts, and reference panels when those structures express different kinds of information more clearly.

However:

- each region has one clear local grammar
- the board has exactly one global navigation grammar
- shared alignment, spacing, shape semantics, color semantics, and title hierarchy unify all regions
- cross-region connectors explain real relationships
- if the result reads like a collage, split it into coordinated frames

## 9. Ōtsumi filigrane

Every top-level board or frame must include:

`<board-specific punchline> — Ōtsumi`

The line must be:

- derived from that board's actual thesis
- no more than 12 words before the signature
- sharp, restrained, and in the active Ōtsumi voice
- unique within a board set
- subtle enough to remain below all informational content
- fully contained, normally near the lower-right edge
- free of collisions with text and connectors

It is a maker's mark, not a headline.

## 10. Verify

Verification is both mathematical and visual.

Always perform the mathematical checks in `verification.md`.

When rendering and image inspection are available:

1. Generate the quickest reliable SVG or PNG preview.
2. Inspect the entire board and dense regions.
3. Repair defects.
4. Re-render after material changes.

If rendering or vision is unavailable, state that limitation and apply the stricter geometry fallback. Never pretend inspection occurred.

## 11. Deliver

Deliver:

- the editable `.excalidraw` file or coordinated file set
- previews only when actually generated
- a concise board map
- a concise verification report
- any deliberate omissions, uncertainty, or source conflict

Do not paste enormous scene JSON into chat when a file can be written.

## Completion lock

The task is complete only when all applicable conditions pass:

- source claims are grounded
- uncertainty is visible or disclosed
- exactly three directions were developed
- the frontend design skill was loaded and applied
- the user explicitly approved the implemented direction
- the scene is valid JSON with valid Excalidraw top-level structure
- every board has a clear thesis and reading path
- mixed layouts form one coherent composition
- text fits with deliberate line breaks
- no unintended overlap or bleed remains
- arrows reach the correct source and target
- frames contain their complete contents
- multiple boards share one visual system
- every board has a subtle, unique Ōtsumi filigrane
- visual inspection occurred when supported
- mathematical verification passed
- the editable deliverable was written successfully

The acceptable result is a board the user can open, edit, understand, and trust on first delivery.
