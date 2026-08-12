# Patch Safety

## Existing Working-Tree Changes

A patch can overlap local changes.

Never clean, stash, restore, or discard those changes automatically.

`git apply --check` is the gate.

If the check fails, report the failure and stop.

## Destructive Path Operations

Before applying, inspect `git apply --summary`.

Creation is normally expected.

Deletion, rename, or mode changes should be surfaced. If they were not clearly expected from the
user's request, require explicit confirmation before applying.

## Path Safety

Do not use `--unsafe-paths`.

Do not rewrite patch paths automatically to force application.

Options such as `-p`, `--directory`, `--include`, or `--exclude` are allowed only when the user
explicitly asks for path remapping/filtering or the patch's declared format requires a clear,
reviewable transformation.

## Failed Apply

Do not respond to failure by automatically trying:

- `--3way`;
- `--reject`;
- whitespace fixing;
- reduced context;
- hand-editing target files.

Those are separate recovery decisions.

## Index Safety

Default apply modifies the working tree only.

Do not use `--index` or `--cached` unless explicitly requested.

Patch generation must not stage files.

## Output Patch Safety

Before generating:

- resolve exact target paths;
- choose a `.patch` destination not included in the target set;
- refuse accidental overwrite.

After generating:

- ensure only targeted paths are present;
- report the patch file as a new local artifact if it is inside the repository.
