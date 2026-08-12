# Graph Field Contract

The current `graph.json` is the schema authority for untouched fields. Never invent undocumented
fields because they look plausible.

## Search

Supported field: `search`.

- `search "{query}"` sets the literal string.
- `reset-search` sets the literal empty string.

## Color Groups

Supported field: `colorGroups`.

A colors proposal replaces the complete value.

Groups must come from explicit user definitions or bounded evidence already resolved through the
vault overview.

Canonical shape only when current `graph.json` confirms it:

```json
{
  "query": "<obsidian search query>",
  "color": { "a": 1, "rgb": 7042559 }
}
```

If current schema differs, preserve the observed schema.

## Forces

Supported:

- `centerStrength`
- `repelStrength`
- `linkStrength`
- `linkDistance`

Change only explicitly requested fields.

## Display and Filters

Supported:

- `showTags`
- `showAttachments`
- `hideUnresolved`
- `showOrphans`
- `showArrow`
- `textFadeMultiplier`
- `nodeSizeMultiplier`
- `lineSizeMultiplier`

Change only explicitly requested fields.

## UI State

Fields such as `scale`, `close`, and `collapse-*` are out of scope by default.

They may enter only when explicitly requested, already present, fully bounded, and shown in the
exact diff.

## Preservation

Every field not intentionally changed keeps its existing value.

Never rebuild from defaults.
