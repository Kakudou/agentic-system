# Migration from the Retired Decision Terminology

Use this reference only when touching older callers, paths, schemas, or records.

The current concept is **law**.

## Canonical Renames

- skill: `doc-decision-record` → `doc-law-record`
- command: `/doc-decision-record` → `/doc-law-record`
- directory: `docs/decisions/` → `docs/laws/`
- result flag: `decision_required` → `law_required`
- `records_written` → `laws_written`
- `records_updated` → `laws_updated`
- `no_record_reasoning` → `no_law_reasoning`

## Migration Rule

Do not automatically move, rename, or rewrite historical files merely because this skill is loaded.

When the user or repository migration explicitly requires it:

1. inventory old paths and caller references;
2. update caller skill dependencies and commands;
3. migrate paths without losing history;
4. preserve identifiers unless the repository's law migration policy says otherwise;
5. validate references after the move.

The migration is repository work, not an implicit side effect of evaluating a feature for a law.

## Current Output

New invocations must use only the law schema.

Do not emit both old and new fields for compatibility unless an explicit external integration still
requires the retired schema.
