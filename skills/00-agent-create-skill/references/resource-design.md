# Resource Design

Read when deciding what belongs in `SKILL.md`, `references/`, or `assets/`.

## Put in `SKILL.md`

Content required on nearly every invocation:

- identity and capability boundary
- activation-critical rules
- prerequisites
- high-level workflow
- hard safety/correctness invariants
- non-obvious gotchas that the agent must know before it can recognize their trigger
- explicit instructions for when to load each resource
- completion/stop conditions

## Put in `references/`

Detailed decision support needed conditionally:

- domain-specific procedures
- evidence/scoring systems
- compatibility matrices
- integration contracts
- conflict-resolution procedures
- large rule tables
- uncommon edge-case handling

A reference should answer one coherent question. Split only when the files will actually be loaded under different conditions.

## Put in `assets/`

Static material to copy/fill/adapt:

- report/checkpoint templates
- prompt templates
- configuration skeletons
- schemas
- example payloads
- lookup data

If an asset contains executable prompt text, Prompt Master may optimize its wording. Otherwise treat it as static.

## Anti-Patterns

- `SKILL.md` that merely says “read all references”.
- Critical rules hidden in a template asset.
- One `references/everything.md` containing the entire original skill.
- Deep chains: `SKILL.md → reference A → reference B → reference C`.
- Repeating identical rules in root and references.
- Splitting a 30-line coherent skill into ten files for aesthetics alone.
