---
name: 04-git-commit
description: "Create safe local Git commits from the current repository changes. Inspect staged and unstaged diffs, partition changes by dominant intent, stage only exact related paths, choose one gitmoji/Conventional Commit message per atomic change, run relevant repository-required checks, commit locally, and verify the result. Never push or rewrite history."
metadata:
  version: "1.0"
  opencode/slash: "true"
---

# Git Commit

Turn the current repository changes into clean local commits.

The governing rule is simple:

> One commit = one logical change = one dominant intent = at most one gitmoji.

Never push.

## Usage

`/04-git-commit`

Use the current repository and current working tree.

## Read When Needed

Always read:

- [Atomic commit rules](references/atomicity.md)

Read when choosing or validating a commit message:

- [Commit message and gitmoji reference](references/commit-messages.md)

## Hard Rules

- Never run `git push`.
- Never create a pull request.
- Never rebase, reset, amend, squash, autosquash, cherry-pick, or otherwise rewrite history unless
  the user explicitly asks for that separate operation.
- Never commit directly on `main` or `master` unless the user explicitly authorizes that branch in
  the current request.
- Never commit on detached `HEAD`.
- Never stage unrelated changes.
- Never use `git add .`, `git add -A`, or another blanket stage when the intended files are known.
- Never discard, restore, checkout, stash, or overwrite working-tree changes.
- Never silently alter an existing staged set.
- Never commit a suspected secret or credential.
- Never claim a check passed unless it actually ran and passed.
- Never use more than one gitmoji in a commit message. If two emojis seem necessary, split the
  change.

## Workflow

### 1. Inspect Repository State

Resolve the repository root and inspect:

```bash
git rev-parse --show-toplevel
git status --porcelain=v2 --branch
git diff --cached
git diff
```

Also account for untracked files reported by status.

Reject:

- detached `HEAD`;
- protected branch without explicit authorization;
- merge/rebase/conflict state requiring resolution first;
- no changes to commit.

### 2. Protect Existing Staging

If the index already contains staged changes:

- inspect them first;
- treat the staged set as user-owned state;
- do not unstage, replace, or mix unrelated unstaged changes into it;
- commit it only when it is itself one coherent atomic change.

If the staged set mixes unrelated intents, stop and report the split needed rather than rewriting the
index behind the user's back.

### 3. Partition Changes

Apply `references/atomicity.md`.

For each candidate commit identify:

- dominant intent;
- exact paths;
- whether any path contains mixed unrelated hunks;
- proposed message.

If one file contains changes belonging to multiple candidate commits and they cannot be separated
safely by whole path, stop before staging that file. Do not fake atomicity.

### 4. Safety Review

Before staging or committing:

- inspect the candidate diff;
- reject obvious credentials, tokens, private keys, secret files, or accidental generated artifacts;
- disclose submodule pointer changes and require them to be intentional;
- ensure every included path belongs to the selected logical change.

### 5. Stage Exact Paths

When no protected staged set already defines the commit:

```bash
git add -- <exact-path> [<exact-path> ...]
```

Then inspect exactly what will be committed:

```bash
git diff --cached --check
git diff --cached
```

If the staged diff contains anything outside the intended atomic group, stop.

### 6. Run Required Checks

Run only checks that are:

- explicitly requested by the user; or
- explicitly required by repository instructions for the affected change.

Do not invent an expensive test matrix.

A failing required check blocks the commit unless the user explicitly instructs otherwise.

### 7. Commit

Choose one message using `references/commit-messages.md`.

Normal form:

```text
{emoji} {type}({scope}): {message}
```

Omit `({scope})` when no meaningful scope exists.

Execute:

```bash
git commit -m "<message>"
```

Do not push.

### 8. Verify

After each commit inspect:

```bash
git show --stat --oneline --decorate -1
git status --porcelain=v2 --branch
```

Verify that:

- the commit exists;
- only the intended staged change entered it;
- unrelated working-tree changes remain untouched.

If more independent atomic groups remain and each can be staged safely by exact path, repeat the
workflow for the next group.

## Output

Return:

- commit SHA(s);
- commit message(s);
- committed paths;
- checks actually run and their result;
- remaining uncommitted changes, if any;
- explicit confirmation that no push occurred.
