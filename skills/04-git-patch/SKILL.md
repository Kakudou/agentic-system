---
name: 04-git-patch
description: "Work with Git diff patches in a local repository. Given a patch, inspect it, run git apply --check, and apply it when requested. Given one or more target files, generate a portable .patch from their tracked changes relative to HEAD. Never commits, pushes, rewrites history, or silently stages files."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Git Patch

Create or apply a plain Git diff patch.

## Usage

`/04-git-patch {patch-or-target-files}`

Interpret the input by shape:

- patch file / supplied patch text → inspect, check, then apply when the request asks to use/apply it;
- repository file path(s) → generate a `.patch` containing those tracked changes.

## Read When Needed

For exact command recipes, read:

- [Patch operations](references/patch-operations.md)

For boundaries and failure behavior, read:

- [Patch safety](references/patch-safety.md)

## Hard Rules

- Never commit or push.
- Never run `git add` merely to make patch generation easier.
- Never rewrite history.
- Never use `git apply --unsafe-paths`.
- Never automatically use `--reject`, `--3way`, whitespace fixing, or fuzzy recovery after a failed
  check.
- Never apply a patch when `git apply --check` fails.
- Never overwrite an existing output `.patch` unless the user explicitly requests replacement.
- Never include unrelated files in a generated patch.
- Preserve supplied patch bytes exactly when materializing or checking them.
- Do not claim a patch applied merely because its syntax parsed.

## Workflow

### 1. Resolve Repository

Inspect read-only state:

```bash
git rev-parse --show-toplevel
git status --porcelain=v2 --branch
```

Do not clean or normalize the working tree.

### 2. Choose Patch Direction

If the input is a patch:

- inspect/apply path.

If the input names repository file(s):

- generate path.

Do not guess between two equally plausible interpretations; return the ambiguity.

## Apply / Use a Supplied Patch

### 3A. Inspect

Use the exact supplied patch file or exact materialized patch bytes.

Before applying:

```bash
git apply --stat <patch>
git apply --summary <patch>
git apply --check <patch>
```

`--check` must succeed.

Surface file creation, deletion, rename, or paths outside the user's expected scope before applying.

If the patch performs a destructive/unexpected path operation, stop for explicit confirmation.

### 4A. Apply

Apply to the working tree only:

```bash
git apply <patch>
```

Do not add `--index` unless the user explicitly asks for index application.

Do not commit.

### 5A. Verify

Inspect:

```bash
git diff --check
git status --porcelain=v2
```

Report the paths changed and whether the patch applied cleanly.

## Generate a Patch from Target Files

### 3B. Validate Targets

Targets must be explicit repository paths.

Reject:

- globs that could capture unrelated files;
- directories used as a substitute for an exact file list;
- targets with no relevant tracked change;
- untracked files that are not represented in Git's diff against `HEAD`.

Do not stage untracked files automatically.

### 4B. Generate

Generate from the target files' complete current tracked change relative to `HEAD`, including staged
and unstaged changes:

```bash
git diff --binary --full-index --default-prefix \
  --output=<output.patch> HEAD -- <target-file> [<target-file> ...]
```

Use the user-supplied output name when provided.

Otherwise use a simple collision-safe `.patch` name and report it.

Follow `references/patch-operations.md`.

### 5B. Verify Generated Patch

Verify that the patch is non-empty and contains only the requested paths.

Because the working tree already contains the generated changes, validate reversibility against the current
state when appropriate:

```bash
git apply --check --reverse <output.patch>
```

Also inspect:

```bash
git apply --stat <output.patch>
```

Do not alter the working tree as part of generation.

## Output

For an applied patch, return:

- patch identity;
- check result;
- affected paths;
- apply result;
- remaining working-tree status;
- confirmation that nothing was committed or pushed.

For a generated patch, return:

- `.patch` path;
- targeted files;
- diff/stat summary;
- verification result;
- confirmation that the working tree/index were not intentionally staged or committed by this
  skill.
