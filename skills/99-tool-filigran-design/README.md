# 99-filigran-brand-system

Agent Skills-compatible corporate brand/design-system overlay for Filigran work.

## Intended placement

```text
skills/
├── 98-external-frontend-design/
│   └── SKILL.md
├── 99-blackice-design-language/     # optional, personal identity
│   └── ...
└── 99-filigran-brand-system/
    ├── SKILL.md
    ├── references/
    └── assets/
```

The Filigran skill and Black Ice skill are intentionally separate. Corporate Filigran work should not inherit Black Ice visual language unless the user explicitly requests a hybrid.

## Source model

- Filigran UI = canonical product design-system source.
- filigran.io = corporate/marketing visual calibration.
- 98-external-frontend-design = subject-aware design/execution skill.

## Important

Filigran UI is actively evolving. Exact component APIs and color token values should be refreshed from the current docs or the target repository's installed `@filigran/ui` version when implementation precision matters.
