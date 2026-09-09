# Product-UI-Inspired Technical Presentation Style

Load this reference only for a static presentation or diagram when the user explicitly requests a Filigran product-UI-inspired technical expression, supplied visual references exhibit that expression, or the dark technical branch is being evaluated. It does not authorize product UI implementation, React work, motion, video, or interactive behavior.

## Trigger and Branch Prerequisites

Before selecting this branch, record:

1. the selected identity expression and who requested or approved it;
2. supplied visual references, if any, with observed traits, access/provision date, and intended authority; otherwise record `none supplied`;
3. the requested light/dark preference, or permission to derive it from any references and the approved corporate/content context;
4. the approved static medium, dimensions, audience, viewing distance, and delivery format;
5. rights and approved assets under [Provenance and rights](provenance-and-rights.md).

An explicit Filigran product-UI-inspired technical request or matching supplied UI screenshots starts from the dark technical branch unless those references or instructions indicate otherwise. This is a conditional first-shot default, not a universal dark mandate. Corporate-first establishes protected identity decisions; it does not mean light-first. If the evidence points elsewhere, use a light or custom branch and record why.

## Authority by Domain

| Domain | Controlling evidence | Class and limit |
|---|---|---|
| Marks, exact corporate palette, typography roles, imagery, corporate messaging | Current approved deliverable instructions and [Corporate Identity](corporate-identity.md) | `[DR]`; UI evidence never overrides rights or corporate identity. |
| Non-brand surfaces, elevation, layout rhythm, component character, status semantics | Inspected UI documentation and pinned implementation when this branch is selected | `[IE]`; describe it as product UI evidence, never corporate law. |
| Static, large-room translation | Reasoned adaptation from UI evidence to the approved medium | `[IA]`; remove interaction and compact UI density. |
| Project-specific composition and unsupported choices | Named local decision owner | `[LEC]`; keep visible and seek approval when consequential. |

## Current Pinned UI Evidence

**[IE] Current pinned UI evidence, inspected 2026-08-31:**

- [Filigran UI homepage](https://filigranhq.github.io/filigran-ui/)
- [Filigran UI documentation](https://filigranhq.github.io/filigran-ui/docs)
- [Pinned repository commit `860a13c2e12eb01c490936ce871ada08fcba9ec3`](https://github.com/FiligranHQ/filigran-ui/tree/860a13c2e12eb01c490936ce871ada08fcba9ec3)
- [`@filigran/ui` package manifest, version `1.6.10`](https://github.com/FiligranHQ/filigran-ui/blob/860a13c2e12eb01c490936ce871ada08fcba9ec3/packages/filigran-ui/package.json)
- [`@filigran/icon` package, version `0.24.3`](https://github.com/FiligranHQ/filigran-ui/tree/860a13c2e12eb01c490936ce871ada08fcba9ec3/packages/filigran-icon)
- [`theme.css`](https://github.com/FiligranHQ/filigran-ui/blob/860a13c2e12eb01c490936ce871ada08fcba9ec3/packages/filigran-ui/src/theme.css)
- [`globals.css`](https://github.com/FiligranHQ/filigran-ui/blob/860a13c2e12eb01c490936ce871ada08fcba9ec3/packages/filigran-ui/src/globals.css)
- [Typography documentation](https://filigranhq.github.io/filigran-ui/docs/2-typography)
- [Spacing documentation](https://filigranhq.github.io/filigran-ui/docs/3-spacing)

**[IE]** At this 2026-08-31 snapshot, the known docs color demo conflicts with the implementation. Use pinned `theme.css` for implementation evidence, record the conflict, and do not silently reconcile it into a synthetic rule.

## Minimal Dark Technical Subset

The following values are **`[IE]` UI implementation evidence**, not the corporate palette and not corporate rules. Import only the subset needed by the composition; do not copy the complete token system.

| Role | Pinned UI evidence value |
|---|---|
| Page gradient | `linear-gradient(100.35deg, #070d19 0%, #08101d 100%)` |
| Base | `hsl(220 54% 6%)` |
| Layer 1 | `hsl(220 53.57% 10.98%)` |
| Layer 2 | `hsl(220.47 53.09% 15.88%)` |
| Primary text | `hsl(240 4% 95.1%)` |
| Secondary text | `hsl(231.43 4.58% 70%)` |
| Border | `hsl(225 3.92% 20%)` |
| UI brand | `hsl(196.83 100% 62.94%)` |
| UI tonic | `hsl(167 100% 47.06%)` |
| Focus gradient | `linear-gradient(90deg, #0FBCFF -3.68%, #00F1BD 106.62%)` |

Do not relabel UI brand or tonic tokens as exact corporate colors merely because the focus endpoints also appear in the corporate palette. Keep source, domain, and role explicit for every use.

## Static Composition Grammar

- **`[DR]` typography roles:** use Geologica for headings and IBM Plex Sans for body copy. Scale them for the medium rather than copying UI sizes.
- **`[IE]` pinned geometry and spacing evidence:** pinned source records restrained `2px`/`4px` radii, while the documented/pinned spacing set includes `8`/`12`/`16`/`24`/`32px`; these are observed UI facts, not static-media instructions.
- **`[IA]` static geometry and spacing translation:** adapt that restrained geometry and rhythm to the approved static medium, increasing spacing and scale for viewing distance instead of copying compact UI dimensions.
- **`[IA]` layers:** use only two or three elevation layers. Prefer subtle borders and spacing over heavy shadows or a card around every item.
- **`[IA]` emphasis:** use cyan/turquoise sparingly for focus, paths, selected evidence, or a dominant technical signal.
- **`[IA]` status:** use status colors sparsely and only when the represented status semantics are correct. Always add labels, shapes, patterns, icons, or position so color is not the sole cue.
- **`[IA]` component character:** panels, chips, callouts, tables, lanes, and section labels may echo the product UI, but must read as static information rather than controls.
- **`[IA]` hierarchy:** create one dominant message or communicative job per slide/frame, then subordinate evidence and source/status detail.
- **`[LEC]` composition:** record exact grid, margins, line weights, panel allocation, and accent frequency for the project.

## Large-Room Adaptation

Product UI evidence is not permission to reproduce compact dashboard density. For presentations and distant-view diagrams:

- **`[IA]`** scale up all type and spacing for the stated viewing distance;
- **`[IA]`** keep one dominant message per slide or presentation frame;
- **`[LEC]`** set a density budget before layout: maximum major regions, primary claims, body lines, and labelled nodes appropriate to the canvas and audience;
- **`[IA]`** use available vertical space before shrinking type or compressing line height;
- **`[IA]`** rewrite compact UI copy into short presentation language rather than reproducing menus, helper text, or dense table cells;
- **`[IA]`** reject clipped labels, overlapping text, connector collisions, illegible legends, and panels whose hierarchy disappears at distance;
- **`[IA]`/`[LEC]`** verify full-size, overview/thumbnail, and representative projector or large-room views when those views can actually be inspected.

Record the viewing-distance assumption, minimum chosen type, density budget, observed overlap/clipping, and each inspectable result. If rendering or representative display checks did not occur, mark them `UNVERIFIED`; never claim them from guidance alone.

## Approved Assets, Logos, and Fonts

- Use the exact approved **white logo on dark fields** and exact approved **color logo on light fields/images**. Do not redraw, trace, recolor, reconstruct, or extract either from a screenshot.
- When this workflow actually acquires or copies an approved logo, or prepares a deterministic downstream embedding handoff, record the official source page/provider, exact downloaded archive filename and version, exact member path and extracted filename, authorized local path, and each generated or available digest as `SHA-256: <digest>`. Keep the archive and asset out of this portable skill package. If no file is acquired, do not block the specification for lack of a local path or hash.
- Preserve the documented lowercase-`n` clear space. Its final placement remains `UNVERIFIED` without inspectable evidence; never invent numeric clear-space dimensions.
- Keep final brand-owner approval `UNVERIFIED` unless actual approval evidence is supplied.
- If the workflow acquires or copies Geologica or IBM Plex Sans, or prepares a deterministic downstream embedding handoff, use approved deterministic sources and record the exact source, archive/version, exact member and local filenames, licensing, embedding/subsetting method, render/export verification handoff, and each generated or available digest as `SHA-256: <digest>`.
- When local asset or font files are prepared for downstream creation, resolve them deterministically; do not depend on transient signed URLs, remote font fetches, or unrecorded machine state.
- Do not bundle proprietary logos, product marks, kits, photos, fonts, or other restricted material in this skill.

## Static-Only Interaction Boundary

Do not draw controls that imply unavailable behavior. Remove cursor, hover, pressed, editable, expandable, draggable, disclosure, or actionable button cues. A tab-like label must make its one static state explicit; a panel must read as information, not a clickable card. Do not specify framework-specific or project-specific implementation, product UI code, motion, or video.

## Branch Completion Check

Before calling the guidance complete, verify or explicitly mark unverified:

- branch trigger, supplied references with observed traits/intended authority when they exist (or `none supplied`), and light/dark decision;
- pinned UI commit/packages/inspection date and the exact selected token subset;
- separation of corporate authority, UI evidence, static adaptation, and local choices;
- one dominant message, type scale, viewing-distance assumption, density budget, and full-size/thumbnail/projector checks;
- no clipped or overlapping labels and no compact UI copy;
- correct exact approved logo variant for the field and lowercase-`n` clear space; if the logo was acquired/copied or handed off for deterministic embedding, exact source/archive/member/filename/version/local-path details and generated or available `SHA-256: <digest>` records;
- deterministic local font/asset resolution and render/export verification handoff when files are actually acquired/copied or prepared for embedding; no file acquisition means hashes and local paths are not a specification blocker;
- non-color cues for status and technical meaning;
- no fake clickability or excluded implementation/motion work;
- final brand-owner approval status.
