# Hacker News

## Purpose

Use Hacker News for developer/startup/AI/security discussion, launch reactions, technical criticism, and practitioner comments.

## When to use

Use when the target audience is technical/startup-oriented or when HN discussion can add implementation, product, AI, security, or launch perspective.

## Entity resolution

Resolve the exact project/company/product name and aliases. HN has no required account resolution unless the identity of a submitter/commenter matters to the claim.

## Preferred access

Use direct `news.ycombinator.com/item?id=...` discussions and host-accessible HN/Algolia search for discovery. Cite/open the original HN item rather than the search index.

## Fallback access

Use domain-restricted web search against `news.ycombinator.com`.

## Query recipes

- `site:news.ycombinator.com "{topic}"`
- `site:news.ycombinator.com/item "{topic}"`
- HN/Algolia search for the exact topic or product name when host-accessible

## Evidence to extract

- story title
- submission date
- points/comments when visible
- submitter when relevant
- substantive comments and authors
- direct HN item citation target

## Freshness validation

Use the story/comment timestamp. Older discussions do not qualify because they resurfaced in search.

## Quality traps

- technical/startup audience bias
- points treated as correctness
- headline-only interpretation without comments
- duplicate submissions of the same underlying event counted as independent corroboration

## Coverage semantics

`covered` when relevant HN items/comments are inspectable; `covered-no-results` after reliable HN search; `partial` when only web-indexed fragments are available; `unavailable` when HN/search cannot be reached.
