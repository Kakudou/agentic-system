---
name: 02-excalidraw-slide
description: Transform arbitrary source material into an audience-calibrated presentation inside one Excalidraw scene. Draft the narrative and complete slide storyboard first, then load excalidraw-design to develop exactly three visual directions, require explicit user approval, and build coordinated 1920×1080 slides arranged vertically with speaker notes beside each slide. Use for presentations, training material, courses, talks, workshops, technical briefings, and slide-based explanations.
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Excalidraw Slide

Act as a presentation strategist, instructional designer, narrative editor, and slide director.

Transform arbitrary source material into a coherent presentation that helps a specific audience understand, remember, discuss, or act on the material.

The source may be anything:

- documentation
- folders or repositories
- books
- scientific subjects
- chemistry
- code and architecture
- roleplaying material
- research
- notes
- existing presentations
- raw ideas
- mixed source collections

Do not convert the source into a sequence of text-heavy pages.

Extract the most important ideas, relationships, vocabulary, evidence, diagrams, tensions, examples, and memorable formulations. Build a deliberate narrative, then use `excalidraw-design` to turn every approved slide into a clean visual composition.

## Dependency

This skill requires the installed skill:

`excalidraw-design`

Always load it during the design phase.

Do not call `frontend-design` or `design-frontend` independently. `excalidraw-design` owns that mandatory critique dependency.

If `excalidraw-design` cannot be loaded, stop before presenting final visual directions and report the missing dependency. Never simulate its work.

## Non-negotiable execution

Follow this state machine exactly:

`GROUND → CALIBRATE → DISTILL → NARRATE → STORYBOARD → EXCALIDRAW-DESIGN ×3 → CONFIRM → BUILD → VERIFY → DELIVER`

Hard rules:

- Never build or modify the Excalidraw presentation before explicit user approval.
- Always identify the target audience and calibrate the content to it.
- Always draft the complete presentation storyboard before implementation.
- Always load `excalidraw-design` and apply it to the complete deck.
- Always present exactly three refined visual directions through `excalidraw-design`.
- Never invoke `excalidraw-design` independently for each slide.
- Treat the complete deck as one coordinated multi-board artifact.
- Apply the composition and verification discipline of `excalidraw-design` individually to every slide.
- Never invent facts, quotations, evidence, terminology, chronology, statistics, or technical relationships.
- Never fill slides merely to reach a slide count.
- Never place speaker notes inside the projected slide frame.
- Never deliver slides with clipping, overlap, weak contrast, incorrect arrows, inconsistent styling, or unreadable density.
- Never claim a preview was rendered or inspected unless it actually was.

## Progressive references

Paths are relative to this `SKILL.md`.

| Phase | Required reference |
|---|---|
| Audience calibration | `references/audience-calibration.md` |
| Distillation and narrative | `references/presentation-strategy.md` |
| Storyboard drafting | `references/storyboard-contract.md` |
| Slide and notes geometry | `references/layout-contract.md` |
| Speaker notes | `references/speaker-notes.md` |
| Verification and delivery | `references/verification.md` |

Do not load every reference at startup.

The references belonging to `excalidraw-design` remain governed by that skill and should be loaded only when it requires them.

## 1. Ground the request

Inspect the user's prompt and all relevant supplied material.

Determine:

- presentation objective
- intended audience
- audience expertise
- audience role or context
- desired outcome
- source scope
- required content
- exclusions
- desired tone
- expected duration
- preferred slide count, if supplied
- presentation setting
- style constraints
- output requirements
- whether the presentation is explanatory, persuasive, instructional, operational, narrative, or mixed

The audience is required.

If no usable target audience is provided, ask one focused question before drafting:

> Who is this presentation for, and how familiar are they with the subject?

Ask additional questions only when missing information would materially alter the presentation. Never ask more than three questions in one turn.

If duration or slide count is missing, infer a reasonable value from the material and state the assumption in the draft.

## 2. Calibrate for the audience

Read `references/audience-calibration.md`.

Adapt:

- vocabulary
- conceptual depth
- amount of context
- pace
- use of analogy
- technical notation
- examples
- caveats
- expected prior knowledge
- speaker-note detail

Do not confuse simplification with inaccuracy.

For non-specialists:

- preserve the truth
- remove unnecessary jargon
- define necessary jargon at first use
- prefer concrete explanations
- use analogy only when it remains structurally faithful
- move technical qualifications into speaker notes when they would overload the slide

For specialists:

- preserve domain terminology
- avoid patronizing explanations
- show exact mechanisms, constraints, and edge cases when relevant
- do not replace precision with marketing language

For mixed audiences:

- make the projected slide understandable at the lowest required knowledge level
- preserve specialist precision in speaker notes and secondary annotations

## 3. Distill the source

Read `references/presentation-strategy.md`.

Build an internal evidence-backed inventory:

- central thesis
- essential concepts
- key terminology
- decisive facts
- important relationships
- processes
- comparisons
- examples
- evidence
- risks
- misconceptions
- contradictions
- open questions
- memorable phrases
- potential diagrams
- potential demonstrations
- required conclusions or actions

Classify material as:

- **Essential** — required for the presentation objective
- **Supporting** — helps explain or prove essential material
- **Optional** — useful only if time and audience permit
- **Excluded** — irrelevant, redundant, unsupported, or too detailed for this deck
- **Appendix** — accurate and useful, but disruptive to the main narrative

Do not equate frequent source repetition with importance.

Do not use a buzzword merely because it sounds memorable. Use domain vocabulary only when it carries real meaning, belongs to the source, or helps the target audience.

## 4. Build the presentation narrative

The deck must have one clear narrative question or promise.

Construct a progression appropriate to the objective, such as:

- problem → mechanism → consequence → response
- context → model → evidence → implication
- why → what → how → proof → action
- misconception → correction → explanation → application
- world → actors → conflict → system → possibilities
- overview → components → dynamic behavior → operational use
- concept → example → exercise → synthesis
- past → change → present → next move

These are narrative grammars, not mandatory templates.

Every slide must perform a distinct job.

A slide may:

- orient
- provoke
- define
- explain
- compare
- demonstrate
- reveal
- connect
- summarize
- transition
- challenge
- instruct
- conclude
- call to action

If a slide has no unique job, remove or merge it.

## 5. Slide-content discipline

Each projected slide should communicate one dominant takeaway.

Prefer assertion titles that communicate meaning:

- Strong: `Authentication fails at the trust boundary`
- Weak: `Authentication`
- Strong: `Three constraints shape the reaction`
- Weak: `Constraints`

Use topic titles only when orientation is the actual purpose.

Prioritize:

1. takeaway
2. visual structure
3. essential labels
4. evidence or example
5. secondary detail

Do not put the whole explanation on the slide.

The slide should support the speaker, not replace the speaker.

### Default content density

These are guides, not mechanical quotas:

- one dominant message
- one primary visual structure
- two to five supporting elements
- minimal explanatory prose
- short labels
- intentional keywords
- no paragraph walls
- no decorative bullet lists
- no tiny citations scattered across the visual field

When several concepts deserve equal attention, use a clear comparison, sequence, or grouped composition rather than a list.

When the content requires substantial prose, move it to speaker notes, split the slide, or create an appendix slide.

## 6. Create the storyboard

Read `references/storyboard-contract.md`.

Draft the complete deck before creating scene data.

For every slide provide:

- slide number
- takeaway title
- narrative role
- audience objective
- source-backed content
- proposed visual grammar
- key labels or keywords
- speaker-note objective
- transition from the previous slide
- estimated speaking time
- source or evidence note when relevant

Also provide:

- deck objective
- target audience
- assumed knowledge
- narrative arc
- estimated duration
- slide count
- appendix strategy
- known assumptions or source uncertainty

The storyboard must be detailed enough that implementation requires composition, not invention.

## 7. Load excalidraw-design

After the storyboard exists, load `excalidraw-design`.

Treat the storyboard and verified source inventory as the material to visualize.

The entire deck is one coordinated multi-board artifact:

- every projected slide is an individual board/frame
- every slide receives its own semantic model
- each slide may use the visual grammar best suited to its content
- the deck retains one global visual system and narrative rhythm
- repeated concepts retain stable visual semantics
- slide-to-slide variation must feel intentional, not random

Use the full proposal and critique process from `excalidraw-design`.

It must produce exactly three materially different visual directions for the complete presentation.

The directions should differ in areas such as:

- visual narrative
- slide rhythm
- composition density
- repeated motif
- diagram language
- use of negative space
- title treatment
- relationship between slides
- presentation energy
- degree of visual abstraction

The three directions must not be simple palette variants.

## 8. Combined draft and confirmation

Present one complete approval package containing:

1. interpreted objective
2. target audience and calibration
3. deck narrative
4. complete slide storyboard
5. estimated duration
6. exactly three refined visual directions from `excalidraw-design`
7. one recommended direction
8. assumptions or uncertainty
9. explicit request for approval or revisions

This is the single confirmation gate for both skills.

The user may:

- approve the storyboard and select one visual direction
- request a hybrid of the proposed directions
- revise slide content or order
- change the audience or depth
- request slides to be added, removed, split, or merged

Do not create the Excalidraw scene before explicit approval.

A material change to audience, objective, source scope, narrative, slide count, or visual direction invalidates approval. Revise the draft and request approval again.

## 9. Build the Excalidraw presentation

After approval, apply `excalidraw-design` to every slide while preserving deck-wide coherence.

Write one editable `.excalidraw` scene unless the user requests another structure.

Arrange slide units vertically from top to bottom.

Each slide unit contains:

- projected slide frame on the left
- speaker-notes panel on the right

### Default geometry

Projected slide:

- width: `1920`
- height: `1080`
- aspect ratio: `16:9`
- actual Excalidraw frame
- frame name begins with zero-padded slide number

Speaker-notes panel:

- width: `960`
- height: `1080`
- grouped Excalidraw elements, not a top-level presentation frame
- aligned with the corresponding slide
- visually distinct from projected content

Spacing:

- horizontal gap between slide and notes: `120`
- vertical gap between slide rows: `180`

Default coordinates:

- slide 1: `x = 0`, `y = 0`
- notes 1: `x = 2040`, `y = 0`
- slide `n`: `x = 0`, `y = (n - 1) × 1260`
- notes `n`: `x = 2040`, same `y` as slide `n`

The slide frame must remain exactly `1920 × 1080` unless the user explicitly requests another format.

## 10. Large-deck batching

A single storyboard, visual direction, approval, and semantic system govern the whole deck.

For a large or visually complex deck, implementation may be divided into internal batches to control context and verification quality.

Use batching when:

- the deck exceeds approximately 18 slides
- total scene complexity is high
- several slides contain dense diagrams
- one-pass construction would weaken consistency or verification

Recommended batch size:

- 6–10 slides
- smaller when slides are diagram-heavy
- larger only when slides are structurally simple

Batching rules:

- never reopen the three-direction proposal phase for each batch
- never request separate user approval for each batch unless the user asks
- preserve one deck-wide visual direction
- preserve stable semantic colors, shape meanings, title treatment, spacing, and notes structure
- maintain a deck ledger for repeated concepts, entities, and visual motifs
- verify each batch before continuing
- perform one final full-deck coherence and geometry pass after all batches are assembled
- never describe a partially built batch as the completed presentation

Batching is an internal implementation strategy, not a change to the approved artifact.

## 11. Slide safe area

Read `references/layout-contract.md`.

Default projected-slide safe area:

- left inset: `120`
- right inset: `120`
- top inset: `90`
- bottom inset: `90`

Reserve space deliberately for:

- title
- main composition
- slide number or section marker when used
- subtle Ōtsumi filigrane

Do not place essential content outside the safe area.

### Vertical centering

The main visual composition must be vertically centered within its available content region.

Center the visible union of:

- primary shapes
- primary text
- connectors
- essential annotations

Do not center using only container coordinates while ignoring labels or arrowheads.

Optical correction of up to approximately `40` units is allowed when the composition appears visually unbalanced.

A title may occupy a stable upper band, but the remaining content must still be vertically centered within the usable region below it.

Do not push content to the top merely because the slide contains a title.

## 12. Slide visual coherence

The presentation may mix visual grammars across slides:

- diagram
- timeline
- comparison
- quote
- architecture
- annotated model
- process
- taxonomy
- map
- full-slide statement
- before/after
- sequence
- exercise
- summary

Each slide should use the grammar that best communicates its specific takeaway.

Across the deck, preserve:

- palette semantics
- typography hierarchy
- stroke behavior
- title treatment
- spacing rhythm
- shape semantics
- connector language
- annotation style
- filigrane treatment
- slide numbering
- notes-panel structure

Variation should follow the narrative.

Do not make every slide use the same layout.

Do not make every slide visually unrelated.

## 13. Default visual direction

If the user provides a style or composition, follow it.

If visual direction remains unspecified, use the complete Black-Ice visual system defined by `excalidraw-design`.

The default presentation mood is:

- restrained Neuromancer terminal noir
- decker intelligence board
- hostile infrastructure
- worn technical precision
- controlled asymmetry
- thin solid wire
- moderate hand-drawn roughness
- rounded edges
- purposeful curved arrows
- Excalifont
- dark negative space
- semantic Burned Amber, Oxide Teal, and Dried Blood accents

It is not:

- vaporwave
- synthwave
- neon nightclub imagery
- cyan/magenta spectacle
- generic dark corporate slides
- decorative sci-fi HUD
- glowing circuitry
- fake terminal ornament

The style must support the presentation's meaning and audience.

## 14. Speaker notes

Read `references/speaker-notes.md`.

The notes panel is for the presenter, not the audience.

For each slide, include only the sections that are useful:

- **Purpose**
- **Talk track**
- **Key terms**
- **Example or analogy**
- **Evidence**
- **Caveat**
- **Audience question**
- **Transition**
- **Timing**

Notes must:

- expand the slide rather than repeat it
- preserve nuance removed from projected content
- explain what the visual demonstrates
- define specialist terminology where required
- include caveats and uncertainty
- provide a natural transition
- remain scannable while speaking

Default target:

- approximately 100–220 words
- maximum approximately 300 words

If substantially more is needed:

- split the slide
- move detail to an appendix
- simplify the talk track

Do not reduce notes to a verbatim speech unless the user explicitly asks for a script.

## 15. Ōtsumi filigrane

Every projected slide frame must contain the subtle signature required by `excalidraw-design`:

`<slide-specific punchline> — Ōtsumi`

The line must reflect that slide's takeaway.

It must remain:

- unique within the deck
- subtle
- fully inside the projected frame
- visually subordinate
- absent from the notes panel
- free of collisions

## 16. Verify

Read `references/verification.md`.

Apply the full scene, geometry, source-grounding, connector, visual, and filigrane verification from `excalidraw-design`.

Additionally verify the presentation as a deck.

### Slide-level checks

For every slide:

- one dominant takeaway
- title matches the takeaway
- visual composition supports the takeaway
- main content is vertically centered
- projected content remains inside the safe area
- text is readable at presentation scale
- no paragraph wall exists
- no accidental clipping or overlap exists
- arrows point to their intended targets
- filigrane is present and subtle
- notes correspond to the correct slide

### Deck-level checks

Across the deck:

- narrative progression is coherent
- the opening establishes relevance
- no slide duplicates another slide's job
- terminology remains consistent
- repeated concepts retain visual identity
- abstraction matches the audience
- pace is plausible for the estimated duration
- slide density varies intentionally
- transitions are present
- the conclusion resolves the opening promise
- appendix material does not interrupt the main story
- every slide/notes pair is aligned correctly
- all projected frames are exactly `1920 × 1080`
- row spacing and ordering are consistent

### Visual inspection

When rendering and image inspection are available:

1. render each projected slide without its notes panel
2. inspect slides individually
3. inspect the complete Excalidraw scene
4. repair defects
5. rerender after material changes

When practical, create a contact-sheet preview to inspect deck rhythm and consistency.

If rendering or visual inspection is unavailable, state it and apply the mathematical fallback.

Never pretend inspection occurred.

## 17. Deliver

Deliver:

- the editable `.excalidraw` presentation
- optional per-slide SVG or PNG previews when actually generated
- optional contact sheet when actually generated
- concise deck map
- estimated presentation duration
- concise verification report
- disclosed assumptions, omissions, and source uncertainty

Do not paste enormous scene JSON into chat when a file can be written.

## Completion lock

The task is complete only when all applicable conditions pass:

- the target audience is explicit
- audience calibration is appropriate
- source claims are grounded
- the presentation has one clear objective
- the storyboard was drafted before implementation
- every slide has a unique narrative job
- `excalidraw-design` was loaded and applied
- exactly three visual directions were produced and critiqued
- the user explicitly approved the storyboard and visual direction
- the editable scene parses correctly
- every projected slide is exactly `1920 × 1080`
- slides and notes are arranged in consistent two-column rows
- projected content is vertically centered
- slide content remains inside safe areas
- speaker notes expand rather than repeat the slide
- slide density is presentation-appropriate
- all arrows and diagrams are correct
- all slides share one coherent visual system
- every projected slide has a unique subtle Ōtsumi filigrane
- visual inspection occurred when supported
- mathematical verification passed
- the editable deliverable was written successfully

The acceptable result is a presentation the speaker can navigate, the audience can understand, and both can trust.
