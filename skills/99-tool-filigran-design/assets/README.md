# Asset Policy

This directory intentionally contains machine-readable design-system facts rather than copied corporate logos or downloaded website artwork.

## Why no duplicated logo file?

The official Filigran UI catalog exposes `LogoFiligranIcon`, and corporate sites may evolve their asset files. For product UI, use the official icon/component source already provided by Filigran rather than shipping a stale duplicate.

For slides, PDFs, video, posters, or other non-code artifacts, use an official logo file supplied by the user/team or retrieved from an approved corporate asset source at execution time.

Do not redraw, trace, approximate, or regenerate the Filigran logo from memory.

## Included assets

- `design-tokens.json`: verified snapshot of exposed palette family names, exact spacing scale, typography class names, documented gradient aliases, and a small set of textually verified color examples.
- `component-inventory.json`: public component catalog snapshot.
- `source-manifest.json`: canonical and observed source URLs plus refresh policy.

## Exact color rule

Because the public colors page renders many swatches without printing all hex values in accessible text, this package deliberately does **not** invent a full color table.

When exact colors matter, resolve them from the current `@filigran/ui` package, current live docs, or approved brand assets.
