# Retrospective Reconstruction

Read when resolving sources and reconstructing what was actually delivered.

## Source Priority

Prefer sources that directly record intent or outcomes:

1. explicit original user/request text
2. accepted requirements/specification/feature file
3. final artifact, implementation, or delivered output
4. tests, validation output, screenshots, benchmarks, or acceptance evidence
5. decisions/ADRs/change records
6. conversation history describing corrections and approvals
7. agent summaries or recollections

Lower-ranked sources may contextualize higher-ranked evidence but should not silently override it.

## Feature-Scoped Mode

When a feature name resolves in the repository, inspect only relevant material. Typical sources include:

- `features/{feature-name}.feature`
- associated tests
- `docs/decisions/` entries relevant to the feature
- implementation diffs/files
- append-only completion logs

Do not scan unrelated repository history merely to inflate the retrospective.

## Standalone Mode

Use the current task/conversation, provided files, generated artifacts, and an explicitly supplied original request.

If several asks occurred, identify the one that produced the delivered result being analyzed. State ambiguity rather than merging unrelated goals.

## Delivered Scope Ledger

Classify material as one of:

- `DELIVERED` — present in the final accepted/inspectable result
- `CONSTRAINT` — boundary or requirement that governed delivery
- `DEFERRED` — explicitly postponed
- `REJECTED` — considered but intentionally excluded
- `ATTEMPTED` — tried but not part of final delivery
- `UNRESOLVED` — remained open
- `UNVERIFIED` — evidence is insufficient

Only `DELIVERED` plus required `CONSTRAINT` material defines the improved prompt's scope by default.

## Corrections

Record a correction when an earlier assumption/output was changed because of user feedback, failed evidence, incompatibility, or discovered constraints.

A correction is a strong friction candidate, but only if better initial prompting could plausibly have prevented it.
