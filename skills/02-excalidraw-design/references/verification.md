# Verification

Use after scene construction and after every material repair.

Verification is mandatory. Visual inspection complements geometry; it does not replace it.

## Verification report states

Every check ends as:

- `PASS`
- `FAIL`
- `NOT AVAILABLE`
- `NOT APPLICABLE`

Do not use vague states such as “looks fine.”

A `FAIL` blocks delivery.

## 1. File integrity

Check:

- strict JSON parses
- top-level `type` is `excalidraw`
- `version` is numeric
- `elements` is an array
- `appState` is an object
- `files` is an object
- output path exists
- output file is nonempty
- final file can be reopened/read after writing

## 2. Element integrity

Check:

- every element ID is unique
- coordinates and dimensions are finite
- visible dimensions are positive
- active references do not target deleted elements
- group IDs reference valid grouping conventions
- frame memberships resolve
- image file IDs resolve
- no accidental duplicate semantic element exists
- edited scenes preserve unknown fields unless intentionally replaced

## 3. Text integrity

For each text element or label:

- content is complete
- exact terminology is preserved
- explicit line breaks are intentional
- measured or estimated bounds fit the container
- padding remains on every side
- text does not cross a frame edge
- font size is readable
- verified Excalifont is used when default styling applies
- no connector crosses important text
- no label overlaps another label

When using estimated metrics, apply the safety factor from `geometry-routing.md`.

## 4. Geometry integrity

Calculate inflated visible bounds.

Check every pair of relevant elements for unintended intersection.

Exclude only:

- valid containment
- bound text
- intentional overlays
- connector endpoints
- approved decorative intersections

Check:

- node-to-node clearance
- text-to-shape clearance
- label-to-label clearance
- annotation-to-connector clearance
- frame containment
- title reserve
- optional maker mark containment
- board-to-board separation

## 5. Connector integrity

For every line or arrow:

- source exists
- target exists when applicable
- relationship is grounded
- direction matches meaning
- arrowhead points to the intended target
- endpoint reaches the intended boundary
- binding references resolve
- route avoids unrelated nodes and important labels
- crossings are minimized
- label describes the relationship
- bidirectional edges are intentional
- feedback routes are distinguishable from forward flow

If a connector is ambiguous at normal viewing scale, it fails.

## 6. Semantic integrity

Compare the board against the evidence ledger.

Check:

- required content is present
- excluded content is absent
- no unsupported facts were introduced
- derived relationships remain defensible
- uncertainty is visible
- source conflicts are preserved or disclosed
- conditions and exceptions survived summarization
- the board answers the user's stated objective
- the abstraction level matches the audience

## 7. Composition integrity

Check:

- one global navigation grammar is evident
- each region has one clear local grammar
- mixed layouts are unified rather than collaged
- entry point is obvious
- reading path can be described in one sentence
- hierarchy is visible without relying only on color
- density bands are distinct
- negative space is intentional
- major regions are balanced
- decorative devices encode real information

## 8. Visual-system integrity

When default styling applies:

- palette roles are semantic and stable
- no more than two active accents dominate a normal board
- warning/exception accents mark real warnings, failures, threats, or conflicts only
- no unsupported genre styling, effects, or fake interface ornament appear
- strokes remain thin and controlled
- shapes preserve stable semantics
- Excalifont is used
- the signature device is subject-specific
- all boards in a set share one visual system

## 9. Optional maker-mark integrity

For every top-level board or frame:

- if a maker mark was requested, exactly the intended mark exists
- its text matches the user-requested signature
- punchline is board-specific
- punchline is no more than 12 words
- line is unique within the set
- content reflects the board thesis
- opacity is subtle
- placement is contained
- no collision exists
- it remains lower priority than all informational content

## 10. Visual inspection

When possible:

1. Export SVG if it can be rendered and inspected reliably.
2. Otherwise export PNG.
3. Inspect the full board.
4. Inspect dense regions at higher scale.
5. Record defects.
6. Repair the editable scene.
7. Re-export after material changes.
8. Inspect again.

Look specifically for:

- clipping
- text wrapping failures
- hidden arrowheads
- lines ending short of targets
- unexpected stacking
- frame-edge bleed
- poor contrast
- uneven padding
- congested crossings
- misleading visual hierarchy
- requested maker mark missing, intrusive, or misplaced

Do not treat an SVG/XML syntax check as visual inspection.

If no renderer or vision capability is available, record `NOT AVAILABLE` and apply the stricter mathematical fallback.

## 11. Mathematical fallback

Mandatory even after visual inspection:

- run all file and element integrity checks
- estimate text bounds with safety margin
- calculate AABB collisions
- calculate frame union bounds
- verify endpoint geometry
- test connector segments against inflated unrelated bounds
- verify spacing rhythm
- verify palette values and semantic usage
- verify requested signatures when applicable

For a connector segment from P1 to P2, test intersection against every unrelated inflated node rectangle. An endpoint intersection is allowed only with its own source or target.

## 12. Repair loop

Repeat:

`CHECK → RECORD DEFECT → REPAIR SOURCE SCENE → RECHECK`

Do not patch only the preview.

After moving a node:

- recompute attached connectors
- recheck labels
- recheck frame bounds
- recheck neighboring gaps

After changing text:

- recompute text bounds
- resize its container
- recheck connectors and frame bounds

After changing a frame:

- recheck every child and optional maker mark

## Final concise report

Deliver a compact report:

```text
Verification
- JSON and scene contract: PASS
- Source grounding: PASS
- Text fit and containment: PASS
- Overlap and spacing: PASS
- Connectors and bindings: PASS
- Multi-board coherence: PASS / NOT APPLICABLE
- optional maker marks: PASS
- Visual render inspection: PASS / NOT AVAILABLE
- Mathematical verification: PASS
```

Add only real limitations or unresolved source uncertainty.

Completion requires zero `FAIL` states.
