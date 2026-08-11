# Threads

## Purpose

Use Threads for public creator, brand, technology, entertainment, and cultural discussion.

## When to use

Use when the relevant audience/creator is active on Threads or when it contributes a distinct social signal not already covered elsewhere.

## Entity resolution

Resolve the correct public profile/handle for named creators, brands, or organizations.

## Preferred access

Use direct public `threads.net` profile/post pages or host-native social search.

## Fallback access

Use domain-restricted web search on `threads.net`; indexing is incomplete, so web-only discovery often implies partial coverage.

## Query recipes

- `site:threads.net "{topic}"`
- `site:threads.net/@{handle} "{topic}"`

## Evidence to extract

- account/handle
- post date/time
- retrieved post text or accurate paraphrase
- engagement only when visible
- direct post citation target

## Freshness validation

Use the post timestamp, not search-engine recency.

## Quality traps

- incomplete indexing
- small platform sample treated as broad sentiment
- reposts/replies counted as independent evidence
- engagement treated as correctness

## Coverage semantics

`covered` when relevant posts can be inspected; `covered-no-results` only with reliable search; web-only/index-limited access usually means `partial`; `unavailable` when usable Threads content cannot be reached.
