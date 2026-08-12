# Agent Skills Specification — Authoring Subset

Use this reference when creating or validating a candidate Agent Skill. It is a compact operational summary of the Agent Skills specification, not a replacement for the canonical specification.

Canonical specification: https://agentskills.io/specification

## Required Shape

A skill is a directory whose required file is `SKILL.md`.

Recommended optional directories used by this pipeline:

```text
<skill-name>/
├── SKILL.md
├── references/
└── assets/
```

Do not add `scripts/` unless executable behavior is genuinely required by the skill. This authoring pipeline itself does not require scripts.

## Frontmatter

`SKILL.md` begins with YAML frontmatter followed by Markdown instructions.

Required fields:

- `name`
- `description`

Optional standard fields include `license`, `compatibility`, `metadata`, and experimental `allowed-tools`.

### `name`

- 1–64 characters.
- Lowercase letters, numbers, and hyphens only.
- Must not start or end with `-`.
- Must not contain `--`.
- Must match the parent directory name exactly.

### `description`

- 1–1024 characters.
- State both the capability and when it should be used.
- Include concrete trigger vocabulary without making activation so broad that unrelated tasks load the skill.

### `metadata`

- Optional map.
- Keys and values are strings.
- Quote version numbers and other values when ambiguity is possible.

## Progressive Disclosure

Assume the agent sees content in three layers:

1. metadata/description during discovery
2. full `SKILL.md` after activation
3. resource files only when requested/needed

Therefore:

- Keep `SKILL.md` under 500 lines and preferably below 5,000 tokens.
- Keep always-needed rules and non-obvious gotchas in `SKILL.md`.
- Move conditional detail into focused `references/` files.
- Put reusable static templates, schemas, example skeletons, and other non-procedural resources in `assets/`.
- Tell the agent exactly when to read each resource.

## References and Assets

### `references/`

Use for documentation or detailed instructions needed only in some runs: domain rules, protocols, evidence models, API details, decision procedures.

Keep files focused. Avoid one giant reference that recreates a monolithic `SKILL.md` elsewhere.

### `assets/`

Use for static resources the agent copies, fills, renders, or adapts: output templates, prompt skeletons, configuration skeletons, schemas, example files, lookup data.

Do not hide core behavioral rules only in an asset.

## File References

- Reference resources with paths relative to the skill root.
- Prefer one-level-deep links directly from `SKILL.md`, e.g. `references/evidence.md` or `assets/report-template.md`.
- Avoid chains where one reference must load another reference to discover critical instructions.

## Validation

When available, validate with:

```text
skills-ref validate ./<skill-name>
```

Also perform semantic checks from `references/validation.md`; structural validity alone does not prove the skill preserves intended behavior.
