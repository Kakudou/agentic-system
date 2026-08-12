---
name: 04-git-fetcher
description: "Fetch an issue or pull request referenced by number or URL from the current Git repository's remote, preferably through GitHub CLI when the remote is GitHub. Returns the issue/PR content and metadata for downstream work. Read-only: never runs git fetch, git pull, checkout, merge, or any repository mutation."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Git Fetcher

Fetch the issue or pull request the user is referring to.

Despite the name, this skill **does not run `git fetch`**.

## Usage

`/04-git-fetcher {issue-or-pr}`

Examples of `{issue-or-pr}` include `#123`, `issue #123`, `PR #42`, or an issue/PR URL.

## Read When Needed

For GitHub retrieval details, read:

- [GitHub retrieval](references/github-retrieval.md)

For remote parsing and fallback behavior, read:

- [Remote resolution](references/remote-resolution.md)

## Hard Rules

- Read-only only.
- Never run `git fetch`, `git pull`, `git checkout`, `git switch`, `git merge`, or another mutating
  Git command.
- Never change authentication or request new credentials.
- Never fabricate issue/PR content.
- Never assume the repository from a bare `#123` without resolving the current remote.
- Always identify the resolved repository and fetched item number/URL.
- Preserve requirement-bearing body content; do not summarize away acceptance criteria.
- Clearly mark unavailable or truncated content.

## Workflow

### 1. Parse the Reference

Resolve from user input:

- item number or URL;
- explicit kind when stated: issue or pull request;
- explicit repository when stated.

A full item URL may supply repository identity directly.

### 2. Resolve Repository

When repository identity is not explicit, inspect the current repository read-only:

```bash
git rev-parse --show-toplevel
git remote get-url origin
```

If `origin` is absent, inspect configured remotes and use another remote only when exactly one
unambiguous repository remote exists.

Follow `references/remote-resolution.md`.

### 3. Fetch

For GitHub, prefer the already-authenticated `gh` CLI because it provides structured fields.

Follow `references/github-retrieval.md`.

If `gh` is unavailable or the remote is another supported web host, use available read-only web
retrieval against the exact issue/PR URL.

If neither path is available, return `BLOCKED` with the repository and item that could not be
retrieved.

### 4. Normalize

Return the useful content, preserving source meaning:

- repository;
- kind: issue or pull request;
- number;
- title;
- state;
- author when available;
- labels;
- assignees when available;
- body;
- created/updated timestamps;
- URL;
- comments when explicitly requested or materially necessary;
- PR-specific branch/review/diff metadata when available and relevant.

Do not invent missing fields.

### 5. Report Source

State whether the content came from:

- `gh`; or
- read-only web retrieval.

## Output

Return the normalized item directly for downstream use.

Do not perform repository changes after fetching it.
