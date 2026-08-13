# Execution and Safety

Semantic decomposition, deduplication, reconstruction, and coverage decisions must be complete before mutation begins.

## Source Immutability

Never rewrite, move, delete, clean, or archive the source as a side effect.

## Corpus Isolation

Deduplication and parent selection use only the configured zettel roots explicitly resolved through the vault overview.

Do not use unrelated vault roots as hidden candidate sources.

## Approval Boundary

Before mutation, the preview must identify:

- every new file path;
- every existing file to update;
- exact update diffs;
- the approved final note content/template rendering;
- reconstruction target when persisted;
- submodule implications when configured.

Apply only after explicit approval.

If an existing file differs from the state used to prepare its approved diff, stop that mutation and rebuild the proposal from current state.

## Batching

Large sources may require several bounded write batches.

1. Finish the full semantic plan and coverage gate first.
2. Freeze note identities and relationships for the approved plan.
3. Partition writes into bounded batches without changing meaning.
4. Verify each batch by read-back before continuing.
5. Stop on a failed or stale mutation.
6. Finalize reconstruction only from verified successful note states.

Never reduce knowledge coverage simply to fit one batch.

## Existing Note Updates

Each update requires:

- current note read;
- exact proposed diff;
- approval;
- recheck against stale state before write;
- post-write read-back.

Preserve unrelated supported content and stable note identity.

## New Files

Each new file requires:

- exact configured parent root;
- collision-free final path;
- authoritative template rendering;
- post-write read-back.

Do not invent or create unconfigured roots.

## Generic Parent Stability

Creating a derived note does not require mutating its generic parent. Ordinary backlinks provide reverse discovery.

## Git

Never run `git add`, `git commit`, or `git push` as part of zettelization. Never transmit decrypted vault content.

## Completion

Report actual state:

- preview only;
- partially applied with exact successful/failed paths;
- completed and verified;
- blocked;
- aborted.

Do not imply all-or-nothing rollback when only some files were written.
