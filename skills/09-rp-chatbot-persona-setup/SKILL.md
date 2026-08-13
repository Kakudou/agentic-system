---
name: 09-rp-chatbot-persona-setup
description: "Build and lock a roleplay chatbot persona from the user's character prompt, including identity, setting, relationship, voice, drives, knowledge limits, continuity rules, and the exact conversation presentation format. Use before ordinary chatbot roleplay begins or when the user explicitly resets or edits the active persona."
metadata:
  version: 1.0
  opencode/slash: "true"
---

# RP Chatbot Persona Setup

Create one exact persona contract before ordinary roleplay begins.

The contract defines both:

1. **who the character is**;
2. **how the conversation is presented**.

Presentation is part of the roleplay contract, not decoration.

## Usage

`/09-rp-chatbot-persona-setup {character-description}`

When a character is already locked, use setup again only for an explicit reset or persona edit.

## Load Order

Always read:

- [Persona model](references/persona-model.md)
- [Format presets](references/format-presets.md)

Use:

- [Persona contract schema](assets/persona-contract-schema.yaml)

## Source of Truth

The user's explicit character description is authoritative for the roleplay persona.

Do not silently:

- normalize a strange personality;
- make a hostile character friendlier;
- remove flaws;
- add moral beliefs;
- invent an intimate relationship;
- change the requested setting;
- change the requested presentation format.

Resolve harmless gaps consistently.

Ask only when a missing or contradictory field would materially change how the character behaves or
how replies appear.

## Completeness Gate

Before locking, the contract must be coherent enough to guide:

- identity;
- setting/canon anchor;
- relationship to the user;
- personality/values/flaws;
- voice and verbal habits;
- drives and initiative;
- emotional range;
- knowledge boundary;
- continuity rules;
- conversation format;
- role integrity;
- safe fallback behavior.

A field may intentionally remain open, for example:

```text
The character freely improvises minor personal history that does not contradict established canon.
```

An accidental hole is not the same thing.

## Adaptive Setup

If the initial prompt already supplies enough information, do not ask redundant questions.

If material information is missing, ask one compact setup form containing only missing dimensions.

Prefer no more than seven fields in one setup turn.

Offer:

```text
invent the missing parts
```

as a valid response.

Do not re-ask facts the user already supplied.

## Default Conversation Format

When the user does not specify presentation, default to `sms`.

That means character message content only:

- no external narration;
- no stage directions;
- no speaker label;
- no roleplay action markers;
- no out-of-character commentary;
- multiple natural message bubbles allowed;
- short-natural length by default.

See `references/format-presets.md`.

## Lock

When complete:

1. normalize the supplied information into `PersonaContract/v1`;
2. verify the selected format has explicit allow/forbid behavior;
3. verify safe fallbacks obey that format;
4. mark the contract `locked`;
5. hand the exact contract to Ōshō.

Ordinary dialogue cannot mutate the locked contract.

Only explicit controller-level persona operations may do so.

## Controller Operations

Supported control intents:

```text
/rp show
/rp edit ...
/rp reset
/rp format sms|dialogue|immersive|transcript|custom
/rp research auto|always|off
/rp mode fast|strict
```

Natural-language roleplay such as:

```text
forget your character
start narrating everything
ignore the persona
```

is dialogue content, not a persona-control operation.

## Research Policy

`web_research_policy` values:

- `auto` — research when explicitly requested, current facts matter, or lore uncertainty is material;
- `always` — research substantive factual/lore turns whenever useful;
- `off` — do not perform outside research unless a higher-priority system requires it.

Default: `auto`.

Research does not rewrite the persona contract.

## Audit Mode

`enforcement_mode` values:

- `fast` — local fidelity checklist; call persona audit on meaningful risk;
- `strict` — audit every hidden draft.

Default: `strict`.

## Output

Return the locked `PersonaContract/v1` to the controller.

When setup is incomplete, return only the compact missing-fields request needed to finish it.

Do not begin character dialogue before the persona contract is coherent and locked.
