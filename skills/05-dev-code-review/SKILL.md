---
name: 05-dev-code-review
description: "Perform a deep, read-only expert code review of a bounded repository scope. Find concrete correctness, architecture, security, reliability, performance, maintainability, observability, and test risks; cite exact evidence; separate blockers from improvements; and produce an evidence-grounded verdict without modifying the repository."
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Expert Code Review

Review code like a senior engineer responsible for the failure when it reaches production.

Remain read-only.

## Usage

`/05-dev-code-review {scope}`

Scope may be a feature, diff, commit range, file set, worktree, or another bounded repository surface.

## Load Order

Always read:

- [review method](references/review-method.md)
- [finding severity](references/severity.md)
- [evidence standard](references/evidence.md)

## Hard Rules

- Never edit, format, repair, stage, commit, or otherwise mutate the repository.
- Never invent code behavior.
- Every material finding requires concrete source/test/config evidence.
- Prefer failure modes and engineering cost over style preferences.
- Separate release blockers from non-blocking improvements.
- Do not manufacture findings to look thorough.
- A clean review is valid when evidence is clean.
- Recommend bounded remediation; recommendation is not authorization.
- Judge code in the context of this repository, not generic ideology.

## Review Dimensions

Review where relevant:

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

Inspect repository instructions and enough surrounding code to understand the contract.

### 2. Trace Behavior-Critical Paths

Prioritize:

1. correctness;
2. security/authorization;
3. state mutation/persistence;
4. external side effects;
5. failure/retry/error paths;
6. concurrency/order;
7. tests protecting those paths.

Do not start with naming trivia.

### 3. Challenge the Design

Ask whether abstractions fit the actual problem, responsibilities sit at the right boundary, complexity is necessary, failures are handled safely, and invariants are encoded rather than assumed.

### 4. Review Tests

Assess whether tests prove real behavior and failure modes.

Look for missing regressions, weak assertions, excessive implementation coupling, over-mocking, and untested error/boundary paths.

### 5. Produce Findings

Emit a finding only when you can state:

- what is wrong;
- exact location(s);
- concrete evidence;
- why it matters;
- credible failure/cost;
- smallest useful remediation;
- confidence.

### 6. Verdict

Use:

- `APPROVE`
- `APPROVE_WITH_NOTES`
- `CHANGES_REQUIRED`
- `BLOCK`

Critical established defects normally imply `BLOCK`; material major blockers imply at least `CHANGES_REQUIRED`.

Do not derive verdict from finding count.

## Output

Return a compact human-readable review with:

1. scope and verdict;
2. short executive summary;
3. findings ordered by severity then confidence;
4. evidence-backed strengths worth preserving, when any;
5. inspected/not-inspected coverage;
6. residual risks or uncertainty.

Do not require a versioned review schema merely to feed another workflow.
