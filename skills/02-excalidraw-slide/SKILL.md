---
name: 02-excalidraw-slide
description: Transform arbitrary source material into an audience-calibrated presentation inside one editable Excalidraw scene. Build the narrative and complete storyboard first, develop exactly three deck-wide visual directions, require explicit approval, construct coordinated 1920x1080 slides with separate speaker notes, and verify the finished deck.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Excalidraw Slide

Turn source material into a coherent presentation, not a stack of summary boxes.

The presentation should help a specific audience understand, remember, discuss, decide, or act.

## Optional Design Integration

If `02-excalidraw-design` or an equivalent Excalidraw design capability is available, use it to strengthen deck-wide visual direction, scene construction, and visual verification.

The presentation capability remains complete without that integration: apply the deck-wide direction, approval, construction, and verification rules in this skill directly.

## Workflow

Follow:

`GROUND → CALIBRATE → DISTILL → NARRATE → STORYBOARD → DESIGN ×3 → CONFIRM → BUILD → VERIFY → DELIVER`

Hard rules:

- Never build or modify the Excalidraw presentation before explicit user approval.
- Identify the target audience and calibrate the material to that audience.
- Draft the complete deck storyboard before implementation.
- Develop exactly three materially different **deck-wide** visual directions.
- Treat the deck as one coordinated multi-board artifact; do not redesign each slide independently.
- Never invent facts, quotations, terminology, chronology, statistics, or technical relationships.
- Never fill slides merely to reach a count.
- Keep speaker notes outside projected slide frames.
- Never claim rendering, preview, inspection, or successful file creation unless it actually occurred.

## Progressive References

Read only what the active stage needs:

- audience calibration → [references/audience-calibration.md](references/audience-calibration.md)
- distillation and narrative → [references/presentation-strategy.md](references/presentation-strategy.md)
- storyboard → [references/storyboard-contract.md](references/storyboard-contract.md)
- slide/notes geometry → [references/layout-contract.md](references/layout-contract.md)
- speaker notes → [references/speaker-notes.md](references/speaker-notes.md)
- final checks → [references/verification.md](references/verification.md)

## 1. Ground and Calibrate

Read the request and all source material that can materially affect the deck.

Establish:

- presentation objective;
- target audience and expertise;
- desired audience outcome;
- source scope and exclusions;
- presentation setting and approximate duration;
- required facts/evidence;
- tone/style constraints;
- output constraints.

If the audience is genuinely unknown and cannot be inferred safely, ask one focused question. Ask additional questions only when missing information would materially change the deck.

Use [audience calibration](references/audience-calibration.md) to choose vocabulary, abstraction, pace, evidence density, and explanation depth.

## 2. Distill and Narrate

Read [presentation strategy](references/presentation-strategy.md).

Write one central promise:

> By the end, this audience will understand, remember, decide, or be able to do ______.

Distill source material by audience value, not by source length.

Preserve:

- essential concepts and relationships;
- evidence that supports the conclusion;
- examples that clarify or make the model memorable;
- constraints, exceptions, and uncertainty that prevent dangerous misunderstanding.

Choose a coherent narrative arc. Every slide must advance the central promise.

## 3. Storyboard

Read [storyboard contract](references/storyboard-contract.md).

Create the complete deck storyboard before any scene construction.

Each slide needs:

- one takeaway;
- one narrative role;
- one audience objective;
- source-backed content;
- intended visual grammar;
- evidence/source note when relevant;
- speaker-note purpose;
- transition in/out;
- timing estimate.

Keep projected content concise. Put explanation, evidence detail, caveats, and speaking prompts into speaker notes when they do not belong on screen.

## 4. Develop Three Deck-Wide Visual Directions

After the storyboard exists, develop three visual directions against the **complete deck**, not slide by slide.

When an optional Excalidraw design capability is available, use it on the complete deck and reconcile its critique with the storyboard constraints. Otherwise perform the direction critique locally: reject generic/interchangeable composition, decorative structure, weak reading paths, inconsistent hierarchy, and visual systems detached from the subject.

The three directions must differ materially in information architecture or presentation strategy, not merely color or placement.

Present the storyboard plus all three refined directions together, recommend one, and request explicit approval or a deliberate hybrid.

Material changes to source, deck narrative, or direction invalidate approval and require reconfirmation.

## 5. Build

After approval:

1. Read [layout contract](references/layout-contract.md) and [speaker notes](references/speaker-notes.md).
2. Build every slide under the approved deck-wide visual system. If an optional Excalidraw design capability is available, it may perform or assist this construction.
3. Preserve stable slide numbering, naming, and alignment across the full deck.
4. Keep projected slide frames at the layout contract's 16:9 geometry unless the user approved another format.
5. Keep notes in the dedicated notes panel beside each slide.
6. For large decks, build in coherent batches while preserving the approved global design and storyboard.

Do not change slide dimensions merely to make overcrowded content fit; redesign the content.

## 6. Speaker Notes

Notes are a speaking interface, not projected content and not a transcript dump.

Use [speaker notes](references/speaker-notes.md) to preserve useful talk track, evidence, terminology, caveats, audience questions, transitions, and timing.

Do not generate empty note headings.

## 7. Verify

Run the deck-specific checks in [references/verification.md](references/verification.md), including scene/composition integrity. When an optional Excalidraw design capability is available, its additional verification may be used as independent evidence.

Verify at minimum:

- storyboard integrity;
- correct slide order and geometry;
- notes matched to the correct slide and kept outside projected frames;
- no clipping, unintended overlap, or unreadable density;
- consistent visual language across slides;
- correct relationships/arrows;
- source-grounded content;
- valid editable Excalidraw structure;
- rendered visual inspection when the host supports it.

Any known failure blocks delivery.

## 8. Deliver

Deliver:

- the editable Excalidraw scene;
- preview/render only when actually generated;
- a concise deck map;
- a concise verification summary;
- material uncertainty or deliberate omissions.

The result is complete only when the user can open, edit, present, and trust the deck.
