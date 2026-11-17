---
name: 12-cyphersystem-catalog
description: "Read the FULL locally embedded Cypher SRD 2025 catalogs, character options, abilities, equipment, genres, creatures and GM rules without network access; authoritative Markdown lookup for tabletop play."
metadata:
  version: "3.1.0"
  opencode/slash: "true"
---

# Complete Cypher 2025 — offline source-of-truth catalog

**The entire `csrd-main.zip/content.en/` Markdown source is now included**, byte-for-byte, at [`../12-cyphersystem-rules/references/csrd-2025/content.en/`](../12-cyphersystem-rules/references/csrd-2025/content.en/_index.md). No internet, database, external SRD reference, script or MCP is required to retrieve rules.

Start with [full contents index](../12-cyphersystem-rules/references/csrd-2025/CONTENT-INDEX.md), [abilities name index](../12-cyphersystem-rules/references/csrd-2025/ABILITY-INDEX.md), [provenance and checksums](../12-cyphersystem-rules/references/csrd-2025/CATALOG-MANIFEST.md), [offline lookup procedure](references/lookup-protocol.md) and [category map](references/catalog-map.md).

**Lookups:** navigate type, flavor, descriptor, focus, ability, equipment, fantasy/magic, modern, sci-fi, horror, romance, superheroes, post-apocalyptic, fairy tale, historical, Weird West, cyberpunk, all creatures, NPCs, cyphers, artifacts, supplementary rules, intrusions, XP and Cypher Shorts directly in `content.en/`. Open the *entire original entry*, not just its heading or indexed name. Follow linked rules to other local chapters. Recognize cost/tier/activation/limits and special cases; no cross-edition rule blending.

**Large-file technique:** for 1,468,618-byte supplementary rules and other long chapters, use the chapter-specific `chapter-index/` locator with source line ranges and search inside the actual source chapter; don't try to load huge documents into an agent turn all at once. The source may contain Hugo `{{< columns2 >}}`, `{{< hint >}}`, and `<--->` formatting tokens. The `readable.en/` mirror labels column separation and notes for prose reading, but **raw `content.en/` is authoritative**.

**Agent handoff:** Kyōsha retrieves source and exact path/heading; Ginshō checks ruling consistency; Kinshō checks informed player choices; Fuhyō records state and plugin-backed roll receipts; Keima handles NPCs; Hisha writes chronicles from logged facts; Kakugyō manages world context; Ōshō alone narrates to the player. Player-facing content should favor scene and consequences over numbers unless those mechanics affect the player's choice.

**Failure:** if a required SRD file was somehow omitted during installation, return `OFFLINE_CATALOG_MISSING` with that path. Do not invent official rules or silently use network access. All session logs and character sheets stay Markdown. The host-native `rpg_dice` plugin remains the sole permitted RPG executable component.
