# Full local Cypher SRD 2025 — authoritative lookup protocol

All 36 source Markdown files from the uploaded `csrd-main.zip/content.en/` are embedded under `../../12-cyphersystem-rules/references/csrd-2025/content.en/` and verified byte-for-byte against the uploaded ZIP. Read [`CONTENT-INDEX.md`](../../12-cyphersystem-rules/references/csrd-2025/CONTENT-INDEX.md) for per-book navigation and [`ABILITY-INDEX.md`](../../12-cyphersystem-rules/references/csrd-2025/ABILITY-INDEX.md) for named options. Their generated indexes are not themselves rule text. Preserve local canonical original wording.

## Source-first process

1. Identify the requested title/category and active genre. Open the full local original source section: type, descriptor, focus, flavor, abilities, gear, creatures, NPCs, cyphers, XP, magic/optional modules or GM rules.
2. For large chapters, open the `chapter-index` file for exact line ranges; read those lines and any referenced definitions in another local chapter. For abilities, use the alphabetical `ABILITY-INDEX.md`; inspect the full bold-definition paragraph (name, action/enabler, Pool cost, prerequisites) rather than trusting only its name.
3. Follow the hierarchy; e.g. a focus tier grants named abilities defined in the alphabetical abilities chapter; rules may impose additional limitations. Always account for Might/Speed/Intellect Pools, stat Edge, Effort, skill training, assets, health/damage, recovery, XP/intrusions and cypher limits using full textual definitions.
4. For creatures, equipment and genre rules, preserve exact values and exceptions. In source `{{< columns2 >}}` and `<--->` represent label/value columns; `{{< hint >}}` is display styling. The optional `readable.en/` mirror replaces only display tokens with explicit column separators and callout labels; when in doubt, consult `content.en/`.
5. Do not silently include optional rules from genres that are not active; cross-family Shadowrun mechanics are never Cypher mechanics. Distinguish RAW from a recorded GM house ruling.
6. Pass mechanical outcomes to Fuhyō for authorized Markdown changes; Ōshō remains sole user-facing narrator. No network call, import script, plugin for session state, or external MCP is used to find rules.

## Provenance

2025-08-22 SRD from the user-provided `daegalus/csrd` ZIP, whose front page announces content updates on 2026-01-06. Git commit unknown because ZIP has no git metadata. The exact file list and SHA-256 checksums appear in `CATALOG-MANIFEST.md`. Preserved under separate Cypher System Open License, not the project's runtime license. Completion refers to **all Markdown source files in the supplied ZIP**.
