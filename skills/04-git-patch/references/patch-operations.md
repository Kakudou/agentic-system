# Patch Operations

Use plain `git diff` / `git apply` patches.

This skill does not use `git format-patch` or `git am`; those operate on commit/email patch workflows
rather than the requested working-tree diff patch.

## Check a Patch

```bash
git apply --stat <patch>
git apply --summary <patch>
git apply --check <patch>
```

`git apply --check` tests whether the patch can be applied cleanly without applying it.

## Apply a Patch

After a successful check:

```bash
git apply <patch>
```

This modifies the working tree and does not create a commit.

Do not automatically add:

```text
--index
--cached
--3way
--reject
--unsafe-paths
--whitespace=fix
```

Those materially change semantics or recovery behavior and require explicit user intent.

## Pasted Patch Content

When the host can pass exact stdin bytes reliably, the patch may be checked/applied using `-`:

```bash
git apply --check -
git apply -
```

Both operations must consume the exact same patch bytes.

Otherwise materialize the supplied bytes unchanged to a `.patch` file, disclose the path, and use the
file form.

## Generate from Current Tracked Changes

To capture both staged and unstaged tracked changes relative to `HEAD` for explicit paths:

```bash
git diff --binary --full-index --default-prefix \
  --output=<output.patch> HEAD -- <path> [<path> ...]
```

Properties:

- path list constrains the patch;
- `--binary` includes applicable binary diffs and implies patch output;
- `--full-index` records full pre/post blob IDs;
- `--default-prefix` forces standard `a/` and `b/` patch prefixes;
- `--output` writes directly to the requested patch file.

## Generated-Patch Check

A patch generated from the current working tree usually represents changes that are already present,
so a normal forward `git apply --check` may correctly report that it cannot be applied again.

Use:

```bash
git apply --check --reverse <output.patch>
```

to check that the current tree contains a reversible application of the generated patch.

This is verification, not a request to reverse the patch.

## Empty Diff

An empty generated patch is not success.

Report that none of the targeted tracked files differ from `HEAD`.
