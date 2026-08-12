# Execution and Safety

All semantic work is proposal work.

Fuhyō never atomizes, genericizes, deduplicates, chooses links, renders templates, computes coverage,
or decides whether a note exists.

## Source Immutability

Never rewrite, archive, move, delete, or clean the source as a side effect.

## Memory Isolation

Memory-scoped canonical zettels never enter generic discovery, comparison, merge/update decisions,
parent selection, derived linking, or reconstruction.

`kb-obsidian-search` owns that isolation boundary.

Do not feed `kb-memory-query` results back into generic dedup.

## Formal Workflow

This skill is a `formal-bounded-workflow` in dev.

The central formal protocol is authoritative.

A closed batch binds exact inputs, outputs, preconditions, final bytes, hashes, manifest, and success
evidence.

Allowed execution primitives are only:

- `read_exact_bytes`
- `write_exact_bytes`
- `move_exact_bytes`

## Batching

A large source may produce more zettels than one activation can mutate.

1. Finish the full semantic proposal and coverage plan.
2. Freeze stable note identities and relationships.
3. Partition mutations into bounded formal batches.
4. Approve/execute each batch independently.
5. Stop on failure.
6. Finalize reconstruction only from verified successful note states.

Never reduce coverage to fit one batch.

## Updates

Every existing-zettel update requires current snapshot, exact diff, approval, exact final bytes,
precondition, and post-write verification.

## New Files

Require literal final path, configured parent root, absent-file precondition, exact final bytes, and
post-write verification. Never create directories.

## Generic Parent Stability

New derived notes do not mutate generic parents. Backlinks supply reverse discovery.

## Git

Never run `git add`, `git commit`, or `git push`. Never transmit decrypted vault content.

## Terminal States

- `PROPOSED`
- `BLOCKED`
- `PARTIALLY_APPLIED`
- `COMPLETED`
- `ABORTED`

`COMPLETED` requires final reconstruction coverage to pass against verified final states.
