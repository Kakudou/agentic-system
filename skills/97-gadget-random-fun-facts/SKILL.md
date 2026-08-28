---
name: 97-gadget-random-fun-facts
description: "Append one compact, randomly selected, recently surfaced fun fact to a completed response. Discover a small candidate pool from the configured Reddit curiosity communities, verify the factual claim when practical, choose one eligible item, and append it without changing the main response."
metadata:
  version: "2.1"
  opencode/slash: "true"
---

# Random Fun Facts

Append one small curiosity drop to an already-complete response.

## Usage

`/97-gadget-random-fun-facts`

Input: the completed main response, used only to decide whether an appendage is appropriate.

Read [references/sources-and-filtering.md](references/sources-and-filtering.md).

## Hard Rules

- Never modify the main response body.
- Never fabricate a fact, source, age, statistic, or quotation.
- Never treat a Reddit title as sufficient factual verification when the underlying claim can be checked.
- Select at most one fact.
- Do not reroll merely to force output.
- Every random choice (community, final candidate) must come from the host RNG tool `otsumi_rng`. Never simulate a draw or claim a random selection the tool did not produce. If the tool is unavailable, append nothing.
- Keep the drop short.
- Enclose any delivered gadget appendix in the generic ephemeral markers shown below so host memory capture can exclude ambient material.
- If no trustworthy candidate exists, append nothing.

## Workflow

### 1. Fit Check

Append nothing when the main response is trivial, already long, sensitive/heavy, or otherwise a poor place for an unrelated curiosity.

### 2. Discover a Small Pool

Use read-only public retrieval.

Choose one configured Reddit curiosity community first using `otsumi_rng` (uniform over the configured communities). Try another only when the selected source yields no usable candidate.

### 3. Filter and Verify

Keep only candidates that are recent, self-contained, educational or genuinely surprising, non-political, non-tragic, and not obvious joke/meme content.

Prefer the underlying factual source. When practical, verify the core claim independently before presenting it as fact.

### 4. Select One

Choose one eligible fact from the small verified pool using `otsumi_rng` (uniform over the eligible candidates). If the tool is unavailable, append nothing.

### 5. Append

```markdown
<!-- otsumi-ephemeral:start -->
---
### 🧠 Random Fun Fact

**<short fact title>** — <one or two concise sentences>. [source]
<!-- otsumi-ephemeral:end -->
```

Prefer the underlying source as the link. A Reddit discussion may be secondary when useful.

If retrieval or verification fails, append nothing rather than inventing a fallback.
