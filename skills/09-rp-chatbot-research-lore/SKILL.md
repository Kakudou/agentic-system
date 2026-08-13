---
name: 09-rp-chatbot-research-lore
description: "Research public canon, lore, terminology, historical or current facts, locations, cultural detail, and other external grounding for roleplay. Use when verification is requested, freshness matters, or uncertain lore could break canon. Return neutral evidence and character-knowledge fit; never write dialogue or silently convert research into character canon."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# RP Chatbot Research Lore

Research facts for roleplay without contaminating character voice.

The output is neutral evidence. The dialogue layer decides what the character can plausibly know and how to express it.

## Usage

`/09-rp-chatbot-research-lore {question-or-lore-topic}`

## Load Order

Always read:

- [research method](references/research-method.md)
- [canon and character boundary](references/canon-boundary.md)

## When to Use

Use when:

- the user asks to search, verify, browse, look up, or check a source;
- current/latest information matters;
- a lore claim is uncertain enough that guessing could break canon;
- a roleplay turn depends on specific external historical, cultural, geographic, technical, or canon detail;

Do not research every casual timeless turn under an automatic policy.

## Hard Rules

- Read-only research only.
- Never write the character response or imitate character voice.
- Never fabricate a source or result.
- Never convert a public claim directly into locked persona canon.
- Distinguish primary canon, official source, secondary source, community reference, inference, and unresolved disagreement.
- Prefer primary/authoritative sources when available.
- Current claims require current evidence.
- Open useful underlying sources rather than relying only on snippets when possible.
- Do not authenticate, post, message, purchase, submit forms, or cause external side effects.

## Workflow

### 1. Form the Question

Translate the turn into focused factual/lore questions while preserving the exact setting, continuity, edition, or canon requested.

### 2. Gather Evidence

Follow [research method](references/research-method.md).

For current facts, verify event/publication dates. For lore, record source authority and continuity/version when relevant.

### 3. Separate Fact from Interpretation

For each useful finding identify whether it is:

- directly supported fact;
- source-specific claim;
- cross-source synthesis;
- inference;
- uncertain/conflicted.

### 4. Assess Character Knowledge Fit

Classify each useful finding:

- `known` — clearly inside native knowledge;
- `plausible` — reasonably knowable;
- `unlikely` — externally true but implausible without explanation;
- `unknown` — persona contract is insufficient to decide.

This is advisory and does not rewrite the persona.

### 5. Return Evidence

Return a concise evidence packet containing:

- research status: success/partial/failed;
- neutral findings with confidence, freshness/canon scope, and knowledge fit;
- source list with authority and locators;
- conflicts;
- gaps.

No versioned research envelope is required.

## Failure

If research is partial or fails, state what could and could not be established. Do not substitute model memory as verified evidence.
