# YouTube

## Purpose

Use YouTube for reviews, demos, tutorials, interviews, conference talks, long-form explanations, creator reaction, transcripts, and viewer comments.

## When to use

Use when the topic benefits from demonstration, long-form explanation, creator expertise, interviews, or user review content.

## Entity resolution

Resolve the correct creator/channel for named people, companies, or projects when identity matters. Distinguish official channels from commentary channels.

## Preferred access

Use host-native video/YouTube search and direct `youtube.com/watch` or channel pages. Prefer transcript/content inspection when the host exposes it.

## Fallback access

Use domain-restricted web search for videos/channels. If only title/snippet metadata is available, do not infer claims made inside the video.

## Query recipes

- `site:youtube.com/watch "{topic}"`
- `site:youtube.com "{topic}" review`
- `site:youtube.com "{topic}" tutorial`
- `site:youtube.com "{person}" interview`

## Evidence to extract

- video title
- channel
- publication date
- views/likes/comments when visible
- transcript-backed statements, ideally with timestamps
- high-signal comments only when exposed

## Freshness validation

Use the video publication date for the video; use comment timestamps for comment-based claims. A newly surfaced old video is not recent evidence.

## Quality traps

- thumbnail/title inference without content inspection
- views treated as agreement or accuracy
- creator sponsorship/affiliate incentives
- missing transcripts leading to invented quotations
- old videos surfaced by recent search indexing

## Coverage semantics

`covered` when relevant video content or reliable transcript/metadata can be inspected; `covered-no-results` after reliable search; `partial` when transcripts/comments/content are unavailable; `unavailable` when YouTube cannot be reached reliably.
