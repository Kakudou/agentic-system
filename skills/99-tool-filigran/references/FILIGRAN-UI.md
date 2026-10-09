# Filigran UI — Canonical Product Design System

## Status and source-of-truth policy

Filigran UI describes itself as an evolving/WIP design system and component library. Treat current docs/package code as fresher than this snapshot.

For exact frontend implementation:

1. check the installed `@filigran/ui` version if working in an existing repository;
2. consult the current official documentation;
3. reuse canonical components/tokens;
4. only create local primitives when the library does not provide the required behavior.

## Purpose

The design system is intended to keep Filigran product experiences consistent, efficient, scalable, and customizable.

It is primarily React-based, supports Tailwind-first workflows, and can also function independently of Tailwind.

## Install

The public documentation currently advertises:

```bash
npm install @filigran/ui
```

Do not assume this command is sufficient for a specific repository without checking its package manager and existing dependency strategy.

## Foundations exposed by the docs

### Color families

- gray: 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 900, 1000
- darkblue: 100–900
- blue: 100–900
- turquoise: 100–900
- green: 100–900
- red: 100–900
- orange: 100–900
- yellow: 100–900

The rendered documentation does not expose every palette hex value as text. Do not guess them. Use current package variables/classes for exact implementation.

### Typography classes

- `txt-jumbo`
- `txt-title`
- `txt-subtitle`
- `txt-category`
- `txt-tab`
- `txt-container-title`
- `txt-default`
- `txt-sub-content`
- `txt-mini`

See `TYPOGRAPHY-SPACING.md` for intended roles.

### Spacing scale

- `xxs`: 0.125rem
- `xs`: 0.25rem
- `s`: 0.5rem
- `m`: 0.75rem
- `l`: 1rem
- `xl`: 1.5rem
- `xxl`: 2rem

The docs show these names being used across padding, margin, width/height constraints, gap, inset, translate, scroll margin, and scroll padding utilities.

## Component-first rule

If a canonical Filigran component exists, prefer it over a custom lookalike.

This is especially important for:

- buttons and destructive actions;
- forms and labels;
- dialog/alert behavior;
- tabs/navigation;
- badges/status;
- data tables;
- tooltips/popovers/dropdowns;
- loading/skeleton states;
- iconography.

## Theme handling

The design-system site supports theme switching and components are expressed through semantic variables such as `--background`, `--primary`, and documented gradient variables.

Do not hard-code light-only assumptions into product UI.

## Accessibility

The design-system positioning explicitly emphasizes accessible and consistent interfaces. Preserve component semantics and keyboard behavior when extending styles.

Prefer composition around canonical components rather than overriding internals in ways that break:

- focus states;
- keyboard interaction;
- ARIA relationships;
- disabled behavior;
- destructive confirmation patterns;
- contrast.
