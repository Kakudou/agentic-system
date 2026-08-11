# TikTok

## Purpose

Use TikTok for short-form demonstrations, viral reactions, creator trends, product usage, memes, and fast-moving cultural signals.

## When to use

Use when short-form creator culture is likely to materially shape the topic, especially consumer products, trends, memes, entertainment, and usage demonstrations.

## Entity resolution

Resolve the correct creator handle, brand account, and relevant hashtag(s) when they materially improve retrieval.

## Preferred access

Use direct public creator/video pages or host-native TikTok/social search when readable by the host.

## Fallback access

Use domain-restricted web search. Treat snippet-only results as discovery; do not reconstruct unseen video content.

## Query recipes

- `site:tiktok.com "{topic}"`
- `site:tiktok.com/@{creator} "{topic}"`
- `site:tiktok.com "#{hashtag}"`

## Evidence to extract

- creator
- video date
- caption/transcript or clearly retrieved textual content
- views/likes/comments/shares only when visible
- substantive comments when accessible

## Freshness validation

Use the video publication date or comment timestamp supporting the claim. Search recency and viral resurfacing do not change an old video's date.

## Quality traps

- dynamic/blocked pages
- incomplete web indexing
- unseen video reconstructed from title/snippet
- virality treated as consensus
- engagement treated as factual verification

## Coverage semantics

`covered` only when relevant videos/content can actually be inspected; `covered-no-results` requires reliable platform search; web-only fragments usually mean `partial`; `unavailable` when the host cannot reach usable TikTok content.
