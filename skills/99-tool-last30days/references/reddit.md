# Reddit

## Purpose

Use Reddit for threaded community discussion, recommendations, complaints, troubleshooting, niche expertise, first-hand reports, and reactions.

## When to use

Use when the question asks what users/practitioners think, experience, recommend, dislike, or struggle with. Particularly useful for products, software, hobbies, and niche communities.

## Entity resolution

Resolve 1-3 directly relevant subreddits plus broader peer communities when useful. Verify that similarly named communities are actually about the target topic.

## Preferred access

Use direct public subreddit/thread pages or a host-native Reddit search. Open the thread and inspect substantive comments when available.

## Fallback access

Use domain-restricted web search against `reddit.com`, ideally targeting known subreddits. If only indexed snippets are available, use them for discovery and mark coverage partial.

## Query recipes

- `site:reddit.com "{topic}"`
- `site:reddit.com/r/{subreddit} "{topic}"`
- `site:reddit.com "{topic}" review`
- `site:reddit.com "{topic}" problem OR issue OR complaint`
- `site:reddit.com "{topic}" recommend OR alternative`

## Evidence to extract

- subreddit
- author when visible
- post date
- post claim/experience
- score/upvotes and comment count only when visible
- substantive comments and their authors/scores when available

## Freshness validation

Use the thread/comment creation date. Verify the actual thread date even if the search engine surfaced it as recent. Older evergreen threads do not qualify merely because they received a recent crawl.

## Quality traps

- subreddit culture and demographic sampling bias
- viral slogans mistaken for evidence
- high score treated as correctness
- repeated anecdotes treated as prevalence
- snippets treated as full thread/comment context

## Coverage semantics

`covered` when relevant threads can be inspected; `covered-no-results` only when Reddit was reliably searchable; `partial` when snippets/indexing/login barriers limit thread/comment inspection; `unavailable` when Reddit cannot be reached reliably.
