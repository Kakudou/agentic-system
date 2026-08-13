---
name: 09-rp-chatbot-research-lore
description: "Research public canon, lore, terminology, historical/current facts, locations, cultural detail, and other external grounding needed for a roleplay chatbot turn. Use when the user asks for verification/search, when lore accuracy materially matters, or when a factual claim may be stale. Return neutral evidence for the dialogue writer; never write dialogue or silently convert research into character canon."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# RP Chatbot Research Lore

Research facts for roleplay without contaminating the character voice.

The output is neutral evidence.

Ōshō decides what the character could plausibly know and how to express it.

## Usage

`/09-rp-chatbot-research-lore {question-or-lore-topic}`

## Load Order

Always read:

- [Research method](references/research-method.md)
- [Canon and character boundary](references/canon-boundary.md)

Use:

- [Research packet schema](assets/research-lore-schema.yaml)

## When to Use

Research when:

- the user explicitly asks to search, verify, browse, look up, or check a source;
- current/latest information matters;
- a lore claim is uncertain enough that guessing could break canon;
- the dialogue turn depends on a specific location, historical event, terminology, institution, or
  public-world detail;
- the locked persona's `web_research_policy` requires it.

Do not research every casual timeless turn under `auto`.

## Hard Rules

- Read-only research only.
- Never write the character's response.
- Never imitate the character's voice.
- Never fabricate a source or research result.
- Never turn a public-web claim directly into locked persona canon.
- Distinguish primary canon, official source, secondary source, community reference, inference, and
  unresolved disagreement.
- Prefer authoritative/primary sources where available.
- Current claims require current evidence.
- Do not treat search snippets as sufficient when the underlying source can be inspected.
- Do not perform authentication, posting, messaging, purchase, form submission, or other external
  side effects.

## Workflow

### 1. Form the Research Question

Translate the turn into one or more focused factual/lore questions.

Preserve the actual setting/canon requested by the user.

Do not broaden into generic fandom trivia.

### 2. Gather Evidence

Follow `references/research-method.md`.

For canon/lore, identify source authority.

For current facts/news, verify publication/event dates and prefer current authoritative evidence.

### 3. Separate Fact from Interpretation

Each finding should distinguish:

- directly supported fact;
- source-specific claim;
- cross-source synthesis;
- uncertainty;
- conflict;
- inference.

### 4. Assess Character Knowledge Fit

For each useful finding classify:

- `known` — clearly within locked native knowledge;
- `plausible` — character could reasonably know it;
- `unlikely` — true externally but implausible for the character to know without explanation;
- `unknown` — contract does not establish enough.

This is advisory.

Ōshō owns the final dialogue choice.

### 5. Return Packet

Return one `RoleplayResearch/v1`.

Do not add roleplay prose.

## Research Failure

When research is partial or fails:

- state exactly what could and could not be established;
- preserve uncertainty;
- do not substitute model memory as verified evidence.

A failed lookup is valid evidence of uncertainty, not permission to invent.
