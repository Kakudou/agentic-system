# Remote Resolution

Repository resolution is read-only.

## Preferred Resolution

Use:

```bash
git remote get-url origin
```

If `origin` is absent, inspect:

```bash
git remote -v
```

Use another remote automatically only when the result is unambiguous.

## Common URL Forms

Recognize:

```text
git@github.com:OWNER/REPO.git
https://github.com/OWNER/REPO.git
ssh://git@HOST/OWNER/REPO.git
https://HOST/OWNER/REPO.git
```

Strip a trailing `.git`.

Preserve the actual host.

Do not assume GitHub from an arbitrary host.

## Explicit URL Wins

If the user supplies a complete issue/PR URL, use its host/repository/item identity rather than
overriding it with the current `origin`.

The current repository may still be inspected when needed to establish context, but it must not
change the explicit target.

## Ambiguity

Return a concise blocker when:

- no repository can be resolved;
- multiple remotes point to different repositories and there is no clear target;
- the remote URL cannot be parsed safely;
- a bare item number is supplied outside a Git repository and no repository is explicit.
