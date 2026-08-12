# GitHub Retrieval

Prefer `gh` when it is already available and authenticated.

Do not modify authentication.

## Unknown Kind: `#123`

When the user gives only a number and does not identify issue vs PR, use the GitHub issue endpoint
because GitHub exposes pull requests through the issue representation too:

```bash
gh api repos/OWNER/REPO/issues/123
```

The presence of a non-null `pull_request` field identifies a pull request.

If it is a PR and PR-specific metadata is useful, follow with `gh pr view`.

## Explicit Issue

Use structured output:

```bash
gh issue view 123 --repo OWNER/REPO \
  --json number,title,state,author,labels,assignees,body,createdAt,updatedAt,url
```

Add comments only when requested or needed:

```bash
gh issue view 123 --repo OWNER/REPO --comments
```

## Explicit Pull Request

Use:

```bash
gh pr view 123 --repo OWNER/REPO \
  --json number,title,state,author,labels,assignees,body,createdAt,updatedAt,url,baseRefName,headRefName,isDraft,mergeable,reviewDecision,additions,deletions,changedFiles
```

Add comments/reviews only when they are materially required by the user's task.

## Large Bodies

Preserve requirements and acceptance criteria.

If content must be bounded for context, mark the truncation and retain enough exact structure to
make clear that additional content exists.

Never silently summarize away requirements.
