# Gauntlet Contract Reference

Read this when the goal, bar, or constraints need normalization before execution.

## 1. Required input model

A valid run needs three user-authorized components.

### Goal

The goal names the result, not merely an activity.

Good:
- "Produce a 1,500-word incident postmortem that explains root cause and corrective actions."
- "Implement an API endpoint that satisfies these contract tests."
- "Create a launch plan that can be executed by a three-person team in six weeks."

Weak:
- "Work on the postmortem."
- "Improve the API."
- "Make the plan better."

### Reference / Bar

A bar is usable when success can be decided from observable evidence. It may contain multiple kinds of criteria.

- **Binary:** file exists, required section present, no prohibited item.
- **Threshold:** latency <= 200 ms, error rate < 1%, Flesch score >= X.
- **Comparative:** match or beat a named reference on specified dimensions.
- **Rubric:** score each dimension using anchored descriptions.
- **Behavioral:** passes scenario/test/acceptance cases.
- **Source-of-truth:** conforms to a schema, regulation, API spec, style guide, dataset, or factual source.

A named exemplar alone may be sufficient only when the agent can inspect it. Translate the relevant qualities into criteria before building, while keeping the exemplar for holistic comparison.

### Constraints

Separate hard boundaries from preferences.

- **Hard:** must not be violated. Examples: language/runtime, budget ceiling, file format, safety rule, API compatibility, deadline, prohibited dependency.
- **Soft:** optimize when practical but may trade off. Examples: elegance, brevity preference, implementation convenience.
- **Non-goals:** explicitly out of scope. These protect the loop from Council-driven scope expansion.

If the user does not label a constraint hard or soft, infer from wording conservatively. "Must", "only", "never", "maximum", and compatibility requirements are normally hard.

## 2. Criterion record

Normalize each criterion into this shape:

```yaml
id: C1
name: Short criterion name
kind: binary | threshold | comparative | rubric | behavioral | source-of-truth
mandatory: true
requirement: Observable condition
comparison: meet | match | beat | null
verification: How the condition can be checked
evidence_required: What counts as proof
dependencies: []
```

Do not require YAML in the user-facing conversation. This is an internal clarity model.

## 3. Comparison semantics

Use the user's wording. If unspecified:

- threshold/binary/behavioral criteria default to **meet**;
- a reference used as a parity target defaults to **match**;
- use **beat** only when the user explicitly wants superiority.

Never turn "similar to" into "beat" or "beat" into "roughly similar".

For a comparative criterion, define which dimensions matter. A candidate need not imitate irrelevant traits of the reference.

## 4. Rubric quality

A useful rubric has anchored levels rather than adjectives alone.

Weak:
- polish: excellent

Better:
- `FAIL`: visible defects or incomplete states obstruct normal use.
- `PASS`: normal use is coherent, complete, and free of material presentation defects.
- `STRETCH`: unusually refined details beyond the required bar.

Use `STRETCH` only for prioritization. It does not affect mandatory PASS unless the user made it part of the bar.

## 5. Contract lock

Once execution begins, freeze:

- goal;
- criterion definitions;
- mandatory/optional status;
- reference version or snapshot, when possible;
- comparison semantics;
- hard constraints;
- stop/budget constraints.

The agent may clarify a criterion only when the existing wording is genuinely undecidable. A clarification that materially changes difficulty requires user authorization.

Record contract changes explicitly; do not overwrite history.

## 6. Derived necessary properties

The Council can discover an issue that the user did not spell out. Treat it as blocking only when at least one is true:

1. it directly violates a stated criterion;
2. it violates a hard constraint;
3. it makes the stated goal nonfunctional, internally contradictory, factually invalid, or unsafe under the task's ordinary intended use;
4. it invalidates evidence used to claim PASS.

Otherwise classify it as a **stretch suggestion**. This rule prevents scope creep while allowing the Council to catch omissions such as a crash path, a contradictory paragraph, or an unusable interface.

## 7. Acceptance matrix

Before building, create a compact matrix:

| Criterion | Mandatory | Verification | Evidence | Status |
|---|---:|---|---|---|
| C1 | yes | ... | ... | PENDING |

Permitted status values during the run:

- `PENDING`
- `PASS`
- `FAIL`
- `UNVERIFIED`
- `REGRESSED`

A final PASSED run contains no mandatory item in any state except `PASS`.
