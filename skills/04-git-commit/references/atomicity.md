# Atomic Commit Rules

Atomicity is semantic, not merely file-count based.

## One Dominant Intent

A commit should answer one sentence:

> What single change does this commit make?

Good examples:

- add token expiry validation;
- fix retry backoff overflow;
- document the connector lifecycle;
- upgrade one dependency family needed by the same feature.

Bad examples:

- fix retry handling, update README, rename config, and clean old tests;
- miscellaneous cleanup;
- changes after debugging.

## Split When

Split candidate changes when they have independently useful or revertible intent.

Strong split signals:

- feature + unrelated refactor;
- bug fix + unrelated formatting;
- production change + unrelated documentation;
- multiple independent dependency upgrades;
- unrelated test rewrites;
- two different gitmoji intents.

## Keep Together When

Keep files together when separating them would make the commit incomplete or misleading.

Examples:

- implementation + its focused regression test;
- schema change + required migration;
- API rename + all necessary direct call-site updates;
- source change + generated artifact only when the repository explicitly requires the artifact to
  be committed with the source.

## Mixed Hunks in One File

If one file contains unrelated changes for different candidate commits, whole-file staging cannot
produce truthful atomic commits.

Do not silently commit both.

Use a dedicated patch/hunk workflow or ask the user to separate the working tree first.

## Existing Staged State

Pre-existing staged changes are protected user state.

Do not unstage them just to make the workflow easier.

If they form one coherent change, commit them as-is after review.

If they do not, stop with a concise split recommendation.

## Secret and Artifact Smells

Do not commit obvious:

- private keys;
- access tokens;
- passwords;
- credential exports;
- `.env` secrets;
- editor/OS junk;
- build artifacts not normally versioned.

A heuristic suspicion is enough to stop and disclose; do not print the secret value back to the
user.
