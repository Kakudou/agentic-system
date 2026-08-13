---
name: 05-dev-init-project-devblog
description: "Initialize an existing Git project with a dedicated Jekyll developer diary on a local gh-pages branch. Use an isolated orphan worktree, materialize the bundled minimal devblog template, verify it, create one exact local initialization commit, and leave publishing/push as a separate explicit action."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Initialize Project Devblog

Add a minimal engineering diary to an existing Git project without contaminating the development
branch.

The devblog lives on its own local `gh-pages` branch.

The main worktree is never switched to that branch.

## Usage

`/05-dev-init-project-devblog`

## Bundled Resource

Use:

- `assets/devblog-template.tar.gz`

Read:

- [Template contract](references/template-contract.md)
- [Initialization safety](references/init-safety.md)

The template is intentionally small: Jekyll configuration, two layouts, one stylesheet, an index,
a post template, and a GitHub Pages workflow.

## Hard Rules

- Operate only inside an existing Git repository.
- Never overwrite an existing local or remote `gh-pages` branch.
- Never switch the user's main worktree to `gh-pages`.
- Never clean, stash, reset, restore, or discard main-worktree changes.
- Never push.
- Never create or modify repository secrets.
- Never change GitHub Pages repository settings automatically.
- Create only the one local initialization commit described below. Never push or rewrite history.
- Do not copy the old PoC's example doctrine/law posts into a new project.
- Do not invent project history.

## Workflow

### 1. Inspect Repository

Resolve:

```bash
git rev-parse --show-toplevel
git status --porcelain=v2 --branch
git branch --list gh-pages
git ls-remote --heads origin gh-pages
```

The main worktree may contain unrelated local development changes; this skill must not touch them.

If `gh-pages` already exists locally or remotely, return `ALREADY_INITIALIZED` rather than replacing
it.

If `origin` is absent, local initialization may still proceed, but publishing remains unavailable
until a remote exists.

### 2. Resolve Project Metadata

Derive a human project name from repository metadata when unambiguous.

Use the repository description only when it is already available from trusted project context;
otherwise use a neutral description such as:

```text
Developer diary for <project-name>.
```

Do not fabricate product claims.

### 3. Create Isolated Orphan Worktree

Choose a collision-free, visible linked-worktree path outside the main worktree.

Create:

```bash
git worktree add --orphan -b gh-pages <devblog-worktree-path>
```

This branch begins with an empty worktree/index.

Do not use `--force`.

### 4. Materialize Template

Extract `assets/devblog-template.tar.gz` into the new worktree.

Replace only these literal placeholders:

- `{{PROJECT_NAME}}`
- `{{PROJECT_DESCRIPTION}}`

Verify no unresolved `{{...}}` token remains.

Do not introduce sample project events or fake historical blog posts.

### 5. Verify

At minimum inspect:

```bash
git -C <devblog-worktree-path> diff --check --no-index /dev/null .
git -C <devblog-worktree-path> status --porcelain=v2
```

Validate the YAML frontmatter/configuration structurally.

If an appropriate local Jekyll environment is already available, a local build may be run as
additional evidence. Do not install Ruby/gems automatically merely to verify initialization.

### 6. Initial Local Commit

The initial branch contents are one atomic intent:

```text
✨ feat(devblog): initialize developer diary
```

If `04-git-commit` or an equivalent safe local-commit capability is available, it may perform this step.

Otherwise, because the orphan worktree contains only the just-materialized devblog template, stage exactly the files reported by the verified worktree status and inspect the staged diff before committing:

```bash
git -C <devblog-worktree-path> add -- <exact-template-path> [<exact-template-path> ...]
git -C <devblog-worktree-path> diff --cached --check
git -C <devblog-worktree-path> diff --cached
git -C <devblog-worktree-path> commit -m "✨ feat(devblog): initialize developer diary"
```

Do not use blanket staging. Stop if the staged set contains anything outside the initialized template.

Do not push.

### 7. Remove Linked Worktree

After a successful commit and clean worktree:

```bash
git worktree remove <devblog-worktree-path>
```

The committed `gh-pages` branch remains in the repository.

If the worktree is not clean, do not force-remove it.

## Completion

Return:

- repository;
- local `gh-pages` commit SHA;
- template files initialized;
- verification performed;
- whether an `origin` remote exists;
- explicit confirmation that no push occurred.

Publishing is a separate action.

For GitHub Pages Actions deployment to run after a future push, the repository must use GitHub
Pages with GitHub Actions as its publishing source.
