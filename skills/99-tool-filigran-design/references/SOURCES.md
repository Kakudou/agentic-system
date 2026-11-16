# Sources and Research Provenance

Research snapshot: 2026-09-19.

The design system is actively evolving. Re-check live sources when exact implementation details matter.

## Canonical Filigran UI sources

### Design system home

https://filigranhq.github.io/filigran-ui/

Verified from this source:

- Filigran Design System positioning;
- React component library purpose;
- accessibility/consistency framing;
- public package install command `npm install @filigran/ui`.

### Presentation

https://filigranhq.github.io/filigran-ui/docs/0-presentation

Verified from this source:

- WIP/evolving status;
- consistency, efficiency, scalability, customization goals;
- React-first architecture;
- Tailwind-first but optional;
- Filigran Icon library.

### Colors

https://filigranhq.github.io/filigran-ui/docs/1-colors

Verified from this source:

- gray scale and named palette families;
- `#009474` / `#00020c` contrast example;
- accessibility contrast checks shown in the docs.

### Typography

https://filigranhq.github.io/filigran-ui/docs/2-typography

Verified from this source:

- `txt-jumbo`, `txt-title`, `txt-subtitle`, `txt-category`, `txt-tab`, `txt-container-title`, `txt-default`, `txt-sub-content`, `txt-mini`;
- documented role examples for default/sub-content text.

### Spacing

https://filigranhq.github.io/filigran-ui/docs/3-spacing

Verified from this source:

- xxs → xxl spacing values;
- documented utility usage across padding/margin/size/gap/etc.

### Component catalog

https://filigranhq.github.io/filigran-ui/docs

Verified from this source:

- component categories and current public inventory.

### Button

https://filigranhq.github.io/filigran-ui/docs/components/button/button

Verified from this source:

- canonical button sizing/variant concepts and destructive semantics.

### Gradient Button

https://filigranhq.github.io/filigran-ui/docs/components/button/gradient-button

Verified from this source:

- animated gradient border/text behavior;
- default gradient aliases `--blue-default` and `--turquoise-300`;
- background alias `--background`.

### Card

https://filigranhq.github.io/filigran-ui/docs/components/card

Verified from this source:

- Card/Header/Title/Description/Content/Footer composition.

### Badge

https://filigranhq.github.io/filigran-ui/docs/components/badge

Verified from this source:

- default/secondary/warning/outline/destructive variants.

### Icon catalog / Filigran logo icon

https://filigranhq.github.io/filigran-ui/docs/components/1-filigran-logo

Verified from this source:

- Filigran icon catalog;
- product/domain/general icon availability;
- `LogoFiligranIcon` and other product marks.

### Public repository

https://github.com/FiligranHQ/filigran-ui

Use this only when repository source is accessible and relevant. Prefer the target project's installed package version for implementation compatibility.

## Official corporate calibration sources

### Homepage

https://filigran.io/

Observed from current site:

- concise action-oriented hero hierarchy;
- product + outcome narrative;
- metrics/customer proof;
- product screenshots;
- ecosystem/integration depth;
- strong corporate CTA structure;
- blue/turquoise/indigo visual expression across current assets.

### Use cases

https://filigran.io/use-cases

Observed from this source:

- capability/use-case card structure;
- technical but outcome-oriented corporate copy;
- clean icon-driven feature explanation.

### Guides

https://filigran.io/guides

Observed from this source:

- evidence/review/versioning language;
- editorial hierarchy for educational/technical content;
- clear taxonomy and metadata presentation.

### XTM platform

https://filigran.io/xtm-platform

Observed from this source:

- platform architecture/capability storytelling;
- threat-informed defense and agentic CTEM language;
- open-source + enterprise positioning.

## Important limitation

The public colors page renders many swatches visually but does not expose every hex value in its parsed text. This skill therefore stores palette **names/roles** and only the exact values that were textually verifiable. Do not manufacture the remaining values.
