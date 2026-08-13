---
name: 97-gadget-random-news
description: "Append one compact random news item from either cybersecurity or France to a completed response. Use only when the response-finalizer selects this gadget. Randomly choose the topic, discover a fresh story through the configured Reddit communities, verify the story against the linked or authoritative source, and append a one-item brief without changing the main response."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Random News

Append one fresh news item to an already-complete response.

This skill does **not** own the outer random trigger.

## Usage

`/97-gadget-random-news`

## Read When Needed

Always read:

- [News selection](references/news-selection.md)

## Topic Selection

For each invocation, randomly select one:

```text
cybersecurity
france
```

Target split: approximately 50/50 over time.

Do not reroll merely because the selected topic is inconvenient.

If no trustworthy fresh item exists for that topic, suppress the drop.

## Hard Rules

- Never modify the main response body.
- Never fabricate news, dates, headlines, sources, or summaries.
- Never treat a Reddit title as enough evidence for a news claim.
- Never present an old story as current.
- Never trigger another gadget.
- Never reroll the topic to force output.
- Return at most one story.
- Keep the appendage compact.
- Optional background retrieval failure is silent.
- If the user explicitly requested news, normal user-facing research failure handling applies rather
  than silent suppression.

## Workflow

### 1. Fit Check

Suppress the gadget on trivial responses or when the main answer is already long/heavy enough that
an unrelated news appendage would degrade it.

### 2. Select Topic

Randomly choose `cybersecurity` or `france`.

### 3. Discover Candidates

Use the Reddit communities defined in `references/news-selection.md` as discovery signals.

Look only at recent material.

### 4. Verify

Open the linked article, official advisory, primary statement, or another authoritative source when
available.

Confirm:

- the event actually occurred;
- event/publication date;
- the summary;
- whether the story is still current.

For consequential or disputed claims, cross-check.

### 5. Pick One Story

Choose one eligible story from the selected topic's small candidate pool.

Prefer substance over Reddit score.

### 6. Append

Append:

```markdown
---
### 📰 Random News — <Cybersecurity|France>

**<headline>** — <one or two sentence factual summary>. [source]
```

Prefer the authoritative/underlying story as the main source.

A Reddit discussion link may be secondary when useful.

## Suppression

Return `NO_DROP` internally when:

- retrieval fails;
- selected topic has no trustworthy fresh story;
- candidate stories are stale or promotional;
- verification cannot establish the core claim;
- the drop would be contextually inappropriate.

Never fill the slot with model-memory news.
