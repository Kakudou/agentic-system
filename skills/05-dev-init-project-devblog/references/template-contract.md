# Devblog Template Contract

The bundled template is a minimal Jekyll diary, not a full project doctrine.

## Files

```text
_config.yml
index.md
404.html
assets/main.css
assets/mark-white.png
assets/favicon.png
_includes/telemetry.html
_includes/verdict.html
_layouts/default.html
_layouts/home.html
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

They appear in `_config.yml` (`title`, `project_name`, `description`) and in `index.md`, whose
body is the editable intro paragraph above the log.

Every placeholder must be resolved before commit. Lower-case Liquid such as `{{ page.title }}` is
template code, not a placeholder.

## Visual Design

The template ships the Black Ice design language, fully self-contained in `assets/`:

- TARDIS blue `#003B6F` owns structure: header chassis, rules, log rail, section tabs.
- Lightsaber green `#00FF66` marks live or confirmed state: the latest entry, PASS verdicts, the
  Evidence section marker, keyboard focus, selection.
- Lightsaber orange `#FF8C00` marks anomalies only: FAIL verdicts, `{: .warning}` blocks, the 404.
- Dark Black Ice / Deep Night / Gunmetal surfaces with Fog Gray body text.
- Type roles: Saira Condensed (display), Atkinson Hyperlegible Next (body), Martian Mono
  (utility/code), loaded from Google Fonts with system fallbacks.
- The geometric mark (`mark-white.png`, derived from the Black Ice white transparent logo) anchors
  the header; `favicon.png` is the plain silhouette on a Black Ice tile.
- A non-interactive top artifact layer (`.artifact-layer`, intensity G2): faint grain, hairline
  scanlines, one static margin scar, and a rare three-frame signal tear. Under
  `prefers-reduced-motion` the tear freezes into a static scar instead of disappearing.

Header telemetry (entry count, last entry date) and footer build time come from real site data.

## Devblog Post Template

The post template uses:

- title;
- date;
- layout;
- tags;
- optional `verdict`: `PASS`, `FAIL`, or `UNVERIFIED` (empty when the entry makes no
  verification claim). Any other value renders no badge;
- sections for context, change, evidence, lessons, and next steps.

The `## Evidence` heading gets the green marker automatically through kramdown's generated
`#evidence` id, so keep that heading name.

It intentionally does not contain fabricated sample project events.

When writing a real post later, copy it into `_posts/` using Jekyll's dated filename convention.
The `post` layout is also the default for everything in `_posts/`.

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
