# Instagram

## Purpose

Use Instagram for creator/company announcements, reels, public reactions, product showcases, and visual social signals.

## When to use

Use when creators, brands, visual announcements, reels, or consumer/community reaction on Instagram are materially relevant.

## Entity resolution

Resolve the official creator/company handle and distinguish it from fan, reseller, or similarly named accounts.

## Preferred access

Use direct public post/reel/profile pages or host-native Instagram/social search when readable.

## Fallback access

Use domain-restricted web search on profiles/posts/reels. Do not describe visuals that were not actually retrieved.

## Query recipes

- `site:instagram.com "{topic}"`
- `site:instagram.com/{handle} "{topic}"`
- `site:instagram.com/reel "{topic}"`

## Evidence to extract

- account
- post/reel date
- caption or accessible textual content
- likes/comments/views only when exposed
- substantive comments when accessible
- visual details only when the host actually retrieved the media

## Freshness validation

Use the post/reel timestamp. A recently indexed or resurfaced older post is not recent evidence.

## Quality traps

- unauthenticated access limits
- incomplete indexing
- visual content inferred without retrieval
- likes/views treated as correctness
- brand/creator selection bias

## Coverage semantics

`covered` when relevant posts/reels can be inspected; `covered-no-results` only with reliable search; `partial` when indexing/login barriers expose only fragments; `unavailable` when usable Instagram content cannot be reached.
