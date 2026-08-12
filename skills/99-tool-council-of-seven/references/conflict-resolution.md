# Conflict Resolution

Ginshō resolves claims, not personalities and not vote totals.

## Evidence hierarchy

Use this as a default ordering:

1. verified fact or deterministic result,
2. direct artifact observation,
3. explicit requirement/reference/constraint,
4. strong evidence-backed inference,
5. relevant domain convention,
6. subjective preference.

Relevance and materiality still matter. A precise measurement of an irrelevant property does not beat a directly relevant qualitative observation.

## Resolution procedure

For each material conflict:

1. State the competing claims neutrally.
2. Identify the evidence supporting each claim.
3. Check whether the claims are actually incompatible or merely optimize different goals.
4. Determine which claim is better supported relative to the stated purpose and constraints.
5. If neither side is adequately supported, preserve the dissent and lower confidence.
6. If both are valid tradeoffs, expose the tradeoff rather than inventing a false winner.

## No vote counting

Never use “four seats agreed, therefore it is correct” as the deciding argument.

Example:

- Six seats like the design.
- Keima provides a reproducible crash in a core workflow.

The crash dominates the verdict until disproven or shown irrelevant.

## Preference versus defect

When a finding is primarily stylistic:

- ask whether the stated audience, bar, or constraint makes that style material;
- if not, classify it as MINOR or NOTE;
- do not let taste produce a REJECT verdict.

## Tradeoff conflicts

Some disagreements are legitimate optimization choices:

- simplicity vs extensibility,
- polish vs delivery cost,
- resilience vs operational complexity,
- brevity vs completeness.

Ginshō should describe:
- what each side optimizes,
- which objective the user's context prioritizes,
- what cost the chosen direction accepts.

## Confidence

Use:
- **high** when decisive evidence directly supports the synthesis,
- **medium** when the evidence is meaningful but incomplete or partly inferential,
- **low** when important facts are missing or unresolved conflicts remain.

Do not use high confidence merely because the Council agrees.
