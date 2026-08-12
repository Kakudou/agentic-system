# Deduplication and Update

Use `kb-obsidian-search` for discovery. Do not implement a second vault-wide search engine here.

The corpus is ordinary non-memory zettels only.

## Generic Disposition

### REUSE

Existing generic zettel owns the same core claim and the new source adds no durable generic detail.

### UPDATE

Same core claim, but the new source adds a compatible reusable detail.

Show exact diff. Preserve Creation Date and unrelated content. Add provenance.

### CREATE

No existing zettel owns the same atomic claim.

Similarity alone is not enough to merge distinct principles.

### CONFLICT

Existing and candidate claims materially disagree and the source does not authorize reconciliation.

Do not merge or overwrite.

## Derived Dedup

Compare:

- generic parent identity;
- business/domain binding;
- concrete delta;
- title/aliases.

Use:

- `REUSE_DERIVED`
- `UPDATE_DERIVED`
- `CREATE_DERIVED`
- `CONFLICT_DERIVED`

Do not create duplicate derived applications of the same parent in the same context.

## Domain-Bound Dedup

Compare the full concrete claim. Do not force it through a nonexistent generic parent.

## Update Quality

Integrate new knowledge coherently instead of appending archaeological strata forever.

A proposal may rewrite only the minimal affected prose while preserving all existing supported
claims, unrelated sections, stable identity, Creation Date, and old provenance.

## No Counter Mutation

Search, comparison, reuse, linking, and embedding do not mutate `total_access`, `use_count`, or
similar counters. Backlinks are the reuse signal.
