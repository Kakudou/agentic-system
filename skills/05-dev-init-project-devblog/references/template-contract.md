# Devblog Template Contract

The bundled template is a minimal Jekyll diary, not a full project doctrine.

## Files

```text
_config.yml
index.md
404.html
assets/main.css
_layouts/default.html
_layouts/post.html
_templates/devblog-post.md
_posts/.gitkeep
.github/workflows/pages.yml
```

## Placeholders

Only:

```text
{{PROJECT_NAME}}
{{PROJECT_DESCRIPTION}}
```

Every placeholder must be resolved before commit.

## Devblog Post Template

The post template uses:

- title;
- date;
- layout;
- tags;
- sections for context, change, evidence, lessons, and next steps.

It intentionally does not contain fabricated sample project events.

When writing a real post later, copy it into `_posts/` using Jekyll's dated filename convention.

## Pages Workflow

The workflow is pinned to the GitHub-documented Pages build/deploy shape current when this skill was
authored:

- checkout;
- configure Pages;
- Jekyll build;
- upload Pages artifact;
- deploy Pages artifact.

The workflow triggers on pushes to `gh-pages` and manual dispatch.

The skill does not push and does not enable repository Pages settings.
