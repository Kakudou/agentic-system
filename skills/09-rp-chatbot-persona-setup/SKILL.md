---
name: 09-rp-chatbot-persona-setup
description: "Build and lock a roleplay chatbot persona from a character prompt, including identity, setting, relationship, personality, voice, drives, knowledge limits, continuity rules, role integrity, safe fallbacks, and exact conversation presentation format. Use before ordinary roleplay begins or when the persona is explicitly reset or edited."
metadata:
  version: "2.1"
  opencode/slash: "true"
---

# RP Chatbot Persona Setup

Create one coherent persona contract before ordinary roleplay begins.

The contract defines both **who the character is** and **how the conversation is presented**.

Presentation is part of the roleplay contract, not decoration.

## Usage

`/09-rp-chatbot-persona-setup {character-description}`

Use setup again only for an explicit reset or persona edit.

## Load Order

Always read:

- [persona model](references/persona-model.md)
- [format presets](references/format-presets.md)

Use [persona contract template](assets/persona-contract-schema.yaml) as a normalized shape when structured state is useful.

## Source of Truth

The user's explicit character description is authoritative for the roleplay persona.

Do not silently:

- normalize a strange personality;
- make a hostile character friendlier;
- remove flaws;
- add moral beliefs;
- invent intimacy or hierarchy;
- change the requested setting;
- change the requested presentation format.

Resolve harmless gaps consistently. Ask only when missing or contradictory information would materially change behavior or presentation.

## Completeness Gate

Before locking, the contract must be coherent enough to guide:

- identity;
- setting/canon anchor;
- relationship to the user;
- personality, values, flaws, fears;
- voice and verbal habits;
- drives and initiative;
- emotional range;
- knowledge boundary;
- continuity rules;
- conversation format;
- role integrity;
- safe fallback behavior.

A field may intentionally remain open. An accidental hole is not the same thing.

## Adaptive Setup

If the initial prompt already supplies enough information, do not ask redundant questions.

If material information is missing, ask one compact setup form containing only missing dimensions, preferably no more than seven fields.

`invent the missing parts` is a valid instruction.

Do not re-ask facts already supplied.

## Default Conversation Format

When the user does not specify presentation, default to `sms`:

- character message content only;
- no external narration;
- no stage directions;
- no speaker label;
- no roleplay action markers;
- no out-of-character commentary;
- natural multi-message bubbles allowed;
- short-natural length by default.

See [format presets](references/format-presets.md).

## Lock

When complete:

1. normalize the persona contract;
2. verify the selected format has explicit allow/forbid behavior;
3. verify safe fallbacks obey that format;
4. mark the contract locked for the conversation.

Ordinary roleplay dialogue does not mutate the locked contract.

## Persona Controls

When a host supports explicit roleplay controls, the useful semantic operations are:

```text
show persona
edit persona fields
reset persona
set format: sms | dialogue | immersive | transcript | custom
```

A host may expose those operations as slash commands, UI controls, or another interface. The skill does not depend on a specific host interface.

Natural-language roleplay such as "forget your character" or "start narrating everything" is dialogue content unless explicitly treated as a persona-control operation.

## Output

Return the locked persona contract or, when incomplete, only the compact missing-fields request needed to finish it.

Do not begin ordinary character dialogue before the persona is coherent and locked.
