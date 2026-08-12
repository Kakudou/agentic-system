# Skill Authoring Contract

Read this before translating a retrospective into a skill.

## Objective

Capture a **reusable capability**, not a transcript, project diary, or frozen answer.

The source retrospective describes what happened. The skill must describe how an agent should handle the same class of task in a fresh context.

## Translation Rules

| Retrospective material | Skill treatment |
|---|---|
| Successful repeated procedure | Turn into ordered workflow or default |
| Friction caused by missing constraint | Add a preventive rule near the relevant step |
| Friction caused by a surprising environment fact | Add a gotcha or conditional reference |
| Stable domain/project convention needed at runtime | Put in focused `references/` if not always needed |
| Reusable output shape | Put in `assets/` when long or conditional |
| One-off implementation detail | Omit unless it generalizes |
| Abandoned path | Omit unless it prevents a repeatable failure |
| User preference specific to the source task | Do not universalize without evidence it is part of the intended skill |

## Generalize Method, Not Scope

A skill should be agnostic enough to handle different inputs in the same problem class, but not so broad that its activation becomes meaningless.

Good generalization:

- concrete feature retrospective → reusable retrospective-to-skill procedure
- one API migration → migration procedure for the same class of API/environment
- one report format → report-generation skill when the format is intentionally reusable

Bad generalization:

- one successful code fix → “solve any software problem”
- one image workflow → “create anything”
- one user preference → universal hard rule

## Fresh-Context Test

Before optimization, ask:

1. Could an agent run this skill without seeing the source conversation?
2. Are inputs, prerequisites, stop conditions, and outputs explicit?
3. Do any instructions say “as discussed”, “same as before”, or otherwise rely on memory?
4. Does the skill include facts an agent already knows while omitting project-specific facts it actually needs?
5. Does each hard rule protect against a real failure mode or required invariant?

If the answer to 1 or 2 is no, the candidate is not ready.

## Instruction Hierarchy

Prefer, in order:

1. invariants and hard constraints where correctness is fragile
2. concise procedures
3. defaults with escape hatches
4. examples only when they lock a non-obvious pattern
5. explanatory prose only when it changes decisions

Avoid ritual language, duplicated MUST statements, and verbose restatement of standard agent behavior.
