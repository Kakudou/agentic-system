# Candidate Validation

Read before final approval and persistence.

Validation has four layers. A candidate must pass all applicable layers.

## 1. Structural

- directory name equals frontmatter `name`
- `name` follows Agent Skills naming constraints
- `description` is present, precise, and under the spec limit
- metadata values are strings
- every referenced local file exists
- referenced paths are relative and shallow
- no accidental temporary/snapshot files are included
- `SKILL.md` stays within the recommended size envelope

Run `skills-ref validate ./<skill-name>` when available.

## 2. Progressive Disclosure

- root contains only always-needed behavior
- each reference has a concrete load condition in `SKILL.md`
- assets are static/reusable rather than hidden procedural law
- no reference must load another reference to discover a critical rule
- no content is duplicated merely to make each file look complete

## 3. Semantic Preservation

Compare against the approved retrospective and pre-optimization snapshot:

- delivered scope preserved
- friction converted into prevention where applicable
- no invented requirements
- no missing success/stop condition
- Prompt Master did not alter protected invariants
- fresh-context execution is possible

## 4. Activation and Operational Fit

- description should trigger on intended requests
- description should not trigger on broad unrelated work
- dependencies are named exactly as installed
- write/persistence behavior is honest about environment capability
- if the skill mutates state, approval/confirmation rules remain explicit

## Failure Handling

Do not “validate by optimism”. Report failed checks and repair the candidate before final approval.
