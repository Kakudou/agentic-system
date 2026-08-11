# X (Twitter)

## Purpose

Use X for fast public reactions, direct statements from people/companies, launch threads, expert commentary, and rapidly evolving narratives.

## When to use

Use for breaking or fast-moving topics, direct public statements, expert reaction, launches, and public narrative shifts. Skip it when the question is purely about an official artifact already established elsewhere.

## Entity resolution

Resolve the canonical handle for named entities using official links or reliable identity evidence. Distinguish the subject's account from fan, parody, aggregator, or similarly named accounts.

## Preferred access

Use direct public `x.com/{handle}` profile/post pages or a host-native X/social search when exposed. Inspect the exact post whenever possible.

## Fallback access

Use domain-restricted web search on `x.com`; repeat with `twitter.com` when older/indexed aliases help. Snippet-only discovery implies partial coverage.

## Query recipes

- `site:x.com/{handle} "{topic}"`
- `site:x.com "{exact phrase}"`
- `site:x.com "{topic}" "{entity}"`
- `site:twitter.com "{topic}" "{entity}"`

## Evidence to extract

- handle/display name
- post date/time
- exact post text or accurate paraphrase
- direct post citation target
- likes/reposts/replies/views only when exposed

## Freshness validation

Use the post timestamp, not the search-result crawl date. For threads, keep the timestamp of the specific post supporting the claim.

## Quality traps

- incomplete web indexing
- viral posts mistaken for broad sentiment
- unverified/parody accounts
- quote-posts/reposts counted as independent evidence
- engagement treated as truth

## Coverage semantics

`covered` when relevant posts can be inspected; `covered-no-results` requires reliable native/direct search; `partial` when only indexed fragments or a subset of posts are accessible; `unavailable` when the platform cannot be reliably reached.
