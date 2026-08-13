---
name: 97-gadget-random-fun-facts
description: "Append one compact, randomly selected, recently surfaced fun fact to a completed response. Use only when the response-finalizer selects this gadget. Discover candidates from the configured Reddit curiosity communities, verify the factual claim when practical, choose one eligible item, and append it without changing the main response."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# Random Fun Facts

Append one small curiosity drop to an already-complete response.

This skill does **not** decide whether it should run.

Random-gadget selection belongs to the response finalizer.

## Usage

`/97-gadget-random-fun-facts`

The caller supplies the completed main response for length/relevance checks.

## Read When Needed

Always read:

- [Sources and filtering](references/sources-and-filtering.md)

## Hard Rules

- Never modify the main response body.
- Never fabricate a fact, source, age, statistic, or quotation.
- Never output an unverified Reddit title as established fact when the underlying claim can be
  checked.
- Never trigger, reroll, recurse, or invoke another random gadget.
- Return at most one fact.
- Keep the drop short.
- Suppress the drop when no good candidate exists.
- Optional background retrieval failure is silent.
- If the user explicitly requested the fun fact/research, retrieval failure must be disclosed by the
  caller rather than silently hidden.

## Workflow

### 1. Check Whether the Drop Fits

Suppress when the supplied main response is:

- a trivial greeting/acknowledgment;
- already long enough that an appendage would be annoying;
- itself a sensitive/heavy exchange where a curiosity drop would be jarring.

Do not alter the original answer to make room.

### 2. Gather a Small Candidate Pool

Use read-only public retrieval.

Start from one randomly chosen configured Reddit curiosity community.

Follow `references/sources-and-filtering.md`.

Do not query every source merely to maximize choice.

### 3. Filter

Keep only candidates that are:

- recent;
- self-contained enough to understand;
- educational or genuinely surprising;
- non-political;
- non-tragic;
- not obvious joke/meme content;
- supported by a credible underlying source or independently verifiable factual basis when practical.

### 4. Select One

Choose one eligible candidate randomly from the small filtered pool.

Do not automatically choose the highest-voted candidate every time.

Randomness occurs **inside this invocation only**.

It does not affect whether the gadget itself was invoked.

### 5. Append

Append exactly:

```markdown
---
### 🧠 Random Fun Fact

**<short fact title>** — <one or two concise sentences>. [source]
```

Use a clickable source supported by the host.

Prefer the underlying factual source when available; the Reddit discussion may be included as a
secondary locator when useful.

## Suppression

Return `NO_DROP` internally when:

- retrieval fails;
- all candidates are stale;
- no claim can be grounded well enough;
- all candidates are heavy/political/low-value;
- the main response should not be interrupted.

Never invent a fallback fact.
