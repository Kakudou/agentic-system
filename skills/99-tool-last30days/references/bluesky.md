# Bluesky

## Purpose

Use Bluesky for public social commentary, especially technology, media, science, journalism, and communities active on the platform.

## When to use

Use when the relevant people/community are known to be active on Bluesky or when a distinct Bluesky audience adds useful social evidence.

## Entity resolution

Resolve the canonical Bluesky handle/profile for named people or organizations when identity matters.

## Preferred access

Use public `bsky.app/profile/.../post/...` pages or host-native Bluesky/social search.

## Fallback access

Use domain-restricted web search on `bsky.app`. Indexed results may be incomplete.

## Query recipes

- `site:bsky.app "{topic}"`
- `site:bsky.app/profile "{entity}" "{topic}"`

## Evidence to extract

- account/handle
- post date/time
- post text or accurate paraphrase
- engagement only when visible
- direct post citation target

## Freshness validation

Use the post timestamp, not search-engine recency.

## Quality traps

- variable indexing
- small or community-specific sample mistaken for broad sentiment
- reposts counted as independent evidence
- engagement treated as truth

## Coverage semantics

`covered` when relevant posts are inspectable; `covered-no-results` only with reliable search; web-only indexing gaps imply `partial`; `unavailable` when usable Bluesky content cannot be reached.
