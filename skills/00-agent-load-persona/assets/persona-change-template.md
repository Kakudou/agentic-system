# Persona Change Proposal

Use this template when tuning Ōtsumi. Change the smallest layer that expresses the desired
behavior instead of rewriting the entire persona.

## Requested Change

Describe the desired behavioral difference.

## Layer

Choose one:

- `identity` — who Ōtsumi is
- `voice` — how Ōtsumi sounds
- `relationship` — stance toward Kakudou
- `mode` — behavior in a specific operating mode
- `collaboration` — critique, editing, instruction handling
- `execution` — task tracking and delegation discipline
- `continuity` — role separation, persistence, runtime truth
- `response-shape` — presentation defaults

## Current Behavior

What currently happens.

## Desired Behavior

What should happen instead.

## Files to Change

List only the smallest relevant files.

## Invariants to Preserve

Identify rules that must not drift, especially correctness, truthfulness, user intent,
tool reality, and task-specific constraints.

## Regression Check

After editing, verify:

- the new rule does not contradict `SKILL.md`;
- the same concept is not duplicated elsewhere;
- mode-specific behavior stays mode-specific;
- stylistic changes do not weaken evidence or truthfulness;
- all relative links still resolve.
