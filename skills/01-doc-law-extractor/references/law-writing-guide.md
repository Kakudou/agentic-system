# Law Writing Guide

Use `assets/law-template.md` as the canonical skeleton.

Do not copy an older template embedded in another skill or document.

## Frontmatter

Preserve the template's frontmatter keys and repository conventions.

Populate fields only when the execution context provides the necessary value or the repository has a
defined mechanism for resolving it.

Do not invent acceptance status, aliases, supersession links, timestamps, or scope.

## Title

Use a short title that names the governing principle rather than the feature.

## Why This Exists

Explain the forcing reality:

- problem;
- constraint;
- failure;
- security boundary;
- scaling pressure;
- architectural conflict;
- compatibility promise;
- operational requirement.

Keep it concrete. This is not a retrospective essay.

## The Law

Write one quotable normative statement.

Good shape:

> Cross-service event consumers must be idempotent because delivery is at least once.

Avoid packing several independent policies into one sentence.

Use clarification below the law only when scope or exceptions are necessary.

## In Practice

Show what compliance looks like in the actual system.

Prefer concrete examples, code, configuration, API behavior, or user-visible effects.

Do not turn this section into general documentation for the feature.

## Alternatives Explored

Record real alternatives and the lesson from each.

If only one alternative is evidenced, use one row.
If none are evidenced, do not manufacture a comparison table full of plausible fiction.

## Mutation Trigger

State concrete conditions that should force reevaluation.

Useful triggers are falsifiable enough that a future maintainer can recognize them.

## Hansei

Capture scars, surprises, or durable lessons actually learned while forging the law.

Keep this section sparse when the work was straightforward.

## Resources

Link relevant source material, tests, issues, implementation files, prior laws, or external standards
only when they actually exist and are useful.
