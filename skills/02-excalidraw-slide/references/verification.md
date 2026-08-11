# Verification

Use after each build batch and before final delivery.

This verification supplements, not replaces, the full checks required by `excalidraw-design`.

Every check ends as:

- `PASS`
- `FAIL`
- `NOT AVAILABLE`
- `NOT APPLICABLE`

Any `FAIL` blocks delivery.

## 1. Dependency and approval

Check:

- `excalidraw-design` was loaded
- exactly three complete-deck visual directions were produced
- its frontend-design critique was applied
- the user explicitly approved the storyboard and direction
- no unapproved material change was implemented

## 2. Storyboard integrity

Check:

- target audience is explicit
- central promise is explicit
- narrative arc is coherent
- every slide has one narrative role
- every slide has one audience objective
- every slide has a source-backed content record
- transitions exist
- duration estimate is plausible
- appendix material is identified
- no implementation content was invented beyond the approved storyboard

## 3. Slide geometry

For every projected slide:

- frame width equals `1920`
- frame height equals `1080`
- frame is an actual Excalidraw frame
- x-position follows the approved column
- y-position follows presentation order
- frame name begins with the correct zero-padded number
- essential content remains inside safe bounds
- title remains inside its title band
- filigrane remains contained
- no notes element belongs to the slide frame

## 4. Notes geometry

For every notes panel:

- width equals `960`
- height equals `1080`
- x-position equals slide x plus `2040`
- y-position matches the slide
- panel is not a projected top-level frame
- notes content fits
- notes remain readable
- panel corresponds to the correct slide number
- no filigrane appears

## 5. Row layout

For slide number `n`:

- expected y = `(n - 1) × 1260`
- slide and notes share expected y
- row gap is consistent
- order matches storyboard
- no row intersects another
- no off-grid accidental displacement exists

For approved nondefault geometry, verify against the explicitly approved contract instead.

## 6. Vertical centering

For every slide:

1. compute the visible union of primary content
2. exclude title, slide number, and filigrane
3. identify available content region
4. compare composition center with region center
5. allow optical correction only when visually justified

Check:

- content is not accidentally top-heavy
- content is not forced downward by title spacing
- labels and arrowheads were included in bounds
- composition remains inside safe area after centering

## 7. Slide-content quality

For every slide:

- one dominant takeaway exists
- title communicates that takeaway
- projected content can be scanned quickly
- no paragraph wall exists
- no decorative bullet list exists
- keywords are intentional
- terminology is consistent
- visual grammar matches the takeaway
- source uncertainty is not hidden
- diagram relationships are grounded
- density suits the audience
- essential text is readable at presentation scale

## 8. Speaker-note quality

For every slide:

- notes expand rather than repeat
- talk track follows the visual
- caveats and uncertainty are preserved
- terminology is defined at the correct level
- evidence is included when needed
- transition is useful
- timing is present or intentionally omitted
- notes do not exceed reasonable length
- notes fit their panel

## 9. Narrative integrity

Across the deck:

- opening establishes relevance and promise
- sequence increases understanding
- no two slides perform the same job without reason
- section changes are signposted
- complexity is introduced progressively
- dense slides are balanced by interpretation or application
- conclusion resolves the opening promise
- action or synthesis is clear
- appendix does not interrupt the main story

## 10. Visual coherence

Across the deck:

- one approved visual direction governs the artifact
- palette meanings remain stable
- shape meanings remain stable
- typography hierarchy remains stable
- title treatment remains stable
- notes panels remain consistent
- slide variation follows narrative purpose
- repeated concepts retain visual identity
- no slide looks like an unrelated template
- default Neuromancer styling remains restrained when applicable

## 11. Filigranes

For every projected slide:

- one unique filigrane exists
- it ends with `— Ōtsumi`
- it reflects the slide takeaway
- it is subtle
- it is readable only on inspection
- it does not collide
- it remains inside the frame
- it does not appear in notes

## 12. Batch verification

When batching is used:

After each batch:

- scene data parses
- slide numbering continues correctly
- deck ledger is updated
- repeated styles match previous batches
- no row overlaps exist
- all batch slides pass slide-level checks

After assembly:

- all batches form one scene
- no duplicated IDs exist
- global element ordering is valid
- repeated entities retain semantics
- row coordinates are continuous
- final deck-wide coherence pass succeeds
- no partial-batch artifact is delivered as final

## 13. Visual inspection

When available:

1. render every projected slide without notes
2. inspect each at normal presentation scale
3. inspect dense slides at higher scale
4. create a contact sheet when practical
5. inspect the whole Excalidraw scene for alignment
6. repair the editable source
7. rerender after material changes

Look for:

- clipping
- illegible text
- weak title hierarchy
- hidden arrowheads
- incorrect endpoints
- accidental top alignment
- inconsistent margins
- visual monotony
- random variation
- filigranes that are missing or too visible
- notes paired with the wrong slide

An XML parse or successful export is not visual inspection.

If visual inspection is unavailable, record `NOT AVAILABLE` and apply mathematical checks.

## 14. Mathematical fallback

Mandatory even when visual inspection succeeds:

- validate scene JSON
- validate unique IDs and references
- verify every `1920 × 1080` frame
- verify notes dimensions and positions
- calculate safe-area containment
- calculate primary-content union
- calculate vertical centering
- detect unintended intersections
- verify connector endpoints and labels through `excalidraw-design`
- verify row positions
- verify text fitting
- verify filigrane presence and uniqueness
- verify deck-wide semantic style ledger

## 15. Duration audit

Sum slide timings.

Check:

- total fits target duration
- opening and conclusion have adequate time
- dense diagrams receive enough explanation time
- exercises include interaction time
- appendix timings are excluded or marked separately
- timing was adjusted through content changes, not dishonest estimates

## Final report

Use a compact report:

```text
Verification
- Dependency and approval: PASS
- Storyboard and source grounding: PASS
- Slide geometry: PASS
- Notes geometry and fit: PASS
- Vertical centering: PASS
- Slide-level content quality: PASS
- Narrative and audience calibration: PASS
- Deck-wide visual coherence: PASS
- Ōtsumi filigranes: PASS
- Visual render inspection: PASS / NOT AVAILABLE
- Mathematical verification: PASS
- Estimated duration: <duration>
```

Add only real limitations, assumptions, or unresolved source uncertainty.

Completion requires zero `FAIL` states.
