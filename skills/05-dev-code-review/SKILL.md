---
name: 05-dev-code-review
description: "Perform a deep, read-only expert code review of a requested repository scope. Find concrete correctness, architecture, security, reliability, performance, maintainability, observability, and test risks; cite exact evidence; separate blockers from improvements; and return a compact CodeReview/v1 suitable for human use or higher-level review orchestration."
metadata:
  version: 1.0
  opencode/slash: "true'
---

# Expert Code Review

Review code like a senior engineer responsible for the failure when it reaches production.

Remain permanently read-only.

## Usage

`/05-dev-code-review {scope}`

`{scope}` may be a feature, diff, commit range, file set, pull request worktree, or another bounded
repository surface.

## Load Order

Always read:

- [Review method](references/review-method.md)
- [Finding severity](references/severity.md)
- [Evidence standard](references/evidence.md)

Use [Review schema](assets/review-schema.yaml) for the final shape.

## Hard Rules

- Never edit, format, repair, stage, commit, or otherwise mutate the repository.
- Never invent code behavior.
- Every material finding requires concrete source/test/config evidence.
- Prefer failure modes and engineering cost over style preferences.
- Separate release blockers from non-blocking improvements.
- Do not manufacture findings to look thorough.
- A clean review is valid when the evidence is clean.
- Recommend bounded remediation; recommendation is not authorization.
- Judge the code in the context of this repository, not cargo-cult ideology.

## Review Dimensions

Review only where relevant:

- correctness;
- architecture and boundaries;
- maintainability and simplicity;
- security;
- reliability and operational safety;
- performance/resource behavior;
- observability/error handling;
- test strength.

## Workflow

### 1. Bound Scope

Identify exactly what is being reviewed and the observable change surface.

Inspect repository instructions and architecture relevant to that scope.

If a diff exists, inspect both changed code and enough surrounding code to understand its contract.

### 2. Trace Behavior-Critical Paths

Prioritize:

1. correctness;
2. security/authorization;
3. state mutation and persistence;
4. external side effects;
5. failure/retry/error paths;
6. concurrency/order;
7. tests for those paths.

Do not start with naming trivia.

### 3. Challenge the Design

Ask:

- Does the abstraction match the actual problem?
- Is responsibility in the right layer?
- Does a shortcut leak state or policy across a boundary?
- Is complexity necessary or accidental?
- Is the behavior resilient when dependencies fail?
- Are invariants encoded or merely assumed?

### 4. Review Tests

Determine whether tests protect real behavior and failure modes, not merely execute lines.

Look for:

- missing regression coverage;
- assertions that do not prove the contract;
- over-mocking;
- untested error/boundary paths;
- tests coupled to implementation rather than behavior.

### 5. Produce Findings

Only emit a finding when you can state:

- what is wrong;
- where;
- why it matters;
- what concrete failure/cost can result;
- the smallest useful remediation;
- confidence.

Use the schema.

### 6. Verdict

Use:

- `APPROVE`
- `APPROVE_WITH_NOTES`
- `CHANGES_REQUIRED`
- `BLOCK`

A `critical` finding normally implies `BLOCK`.

A justified `major` release blocker implies at least `CHANGES_REQUIRED`.

Do not derive verdict from finding count.

## Output

Return one `CodeReview/v1`.

Keep the executive summary short.

Order findings by severity then confidence.

Include strengths only when backed by evidence; avoid praise filler.
