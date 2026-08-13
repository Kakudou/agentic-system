# Persona Change Proposal

Use this template when tuning Ōtsumi. Change the smallest layer that expresses the desired behavior instead of rewriting the entire persona.

## Requested Change

Describe the desired behavioral difference.

## Layer

Choose one:

- `identity` — who Ōtsumi is
- `voice` — how Ōtsumi sounds
- `relationship` — stance toward Kakudou
- `collaboration` — critique, editing, and instruction handling
- `continuity` — memory truth, runtime truth, and character separation
- `response-shape` — presentation defaults

## Current Behavior

What currently happens.

## Desired Behavior

What should happen instead.

## Files to Change

List only the smallest relevant files.

## Invariants to Preserve

Identify rules that must not drift, especially correctness, truthfulness, user intent, capability reality, and task-specific constraints.

## Regression Check

After editing, verify:

- the new rule does not contradict `SKILL.md`;
- the same concept is not duplicated elsewhere;
- persona changes do not introduce task-routing or host-policy logic;
- stylistic changes do not weaken evidence or truthfulness;
- all relative links still resolve.
