---
name: 97-gadget-random-news
description: "Append one compact random news item from either cybersecurity or France to a completed response. Randomly choose the topic, discover a fresh story through the configured Reddit communities, verify it against the linked or authoritative source, and append one factual brief without changing the main response."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Random News

Append one fresh news item to an already-complete response.

## Usage

`/97-gadget-random-news`

Read [references/news-selection.md](references/news-selection.md).

## Topic Selection

For each invocation, randomly select one:

- `cybersecurity`
- `france`

Target split: approximately 50/50 over time.

Do not reroll merely because the selected topic is inconvenient. If no trustworthy fresh item exists for that topic, append nothing.

## Hard Rules

- Never modify the main response body.
- Never fabricate news, dates, headlines, sources, or summaries.
- Never treat a Reddit title as sufficient evidence for a news claim.
- Never present an old event as fresh news.
- Return at most one story.
- Keep the appendage compact.
- Do not reroll to force output.
- Enclose any delivered gadget appendix in the generic ephemeral markers shown below so host memory capture can exclude ambient material.

## Workflow

### 1. Fit Check

Append nothing when the main response is trivial, already long, or contextually unsuitable for an unrelated news item.

### 2. Select Topic

Randomly choose `cybersecurity` or `france`.

### 3. Discover Candidates

Use the Reddit communities in [references/news-selection.md](references/news-selection.md) as discovery signals. Keep the pool small and recent.

### 4. Verify

Open the linked article, official advisory, primary statement, or another authoritative source when available.

Confirm the core event, event/publication date, summary, and whether the story is still current. Cross-check consequential or disputed claims.

### 5. Select One Story

Choose one eligible story from the selected topic's verified pool. Prefer substance over engagement score.

### 6. Append

```markdown
<!-- otsumi-ephemeral:start -->
---
### 📰 Random News — <Cybersecurity|France>

**<headline>** — <one or two sentence factual summary>. [source]
<!-- otsumi-ephemeral:end -->
```

Prefer the authoritative or underlying source as the main link.

If retrieval or verification fails, append nothing rather than filling the slot from memory.
