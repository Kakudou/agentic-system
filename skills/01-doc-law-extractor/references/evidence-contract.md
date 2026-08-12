# Evidence Contract

Law records are repository memory. False history is worse than missing history.

## Evidence Sources

Prefer evidence in roughly this order when available:

1. accepted behavior or acceptance contracts;
2. implementation and configuration actually present in the repository;
3. executable tests and verified test results;
4. security, architecture, or code-review findings;
5. operational evidence, incidents, benchmarks, or traces;
6. issue/task history and explicit user decisions;
7. existing laws and repository conventions.

A source does not become true merely because it appears in prose. Resolve contradictions against the
strongest direct evidence available.

## Evidence Status

Treat material claims as one of:

- `VERIFIED`: directly supported by inspected evidence;
- `SUPPORTED`: strongly grounded by multiple consistent artifacts;
- `INFERRED`: reasonable but not directly established;
- `UNVERIFIED`: insufficient evidence.

A law's governing statement must not depend on `UNVERIFIED` claims.

Use `INFERRED` historical/rationale claims only when clearly framed as inference and when that
inference is necessary. Prefer omitting them.

## Required Evidence by Section

### Why This Exists

Ground the forcing reality in actual constraints, failures, review findings, requirements, or
implementation pressure.

Do not fabricate a dramatic origin story.

### The Law

State only a rule justified by accepted or implemented reality.

### In Practice

Use examples from the actual system when possible. Hypothetical examples must be clearly
hypothetical and must not imply implemented behavior.

### Alternatives Explored

Include only alternatives that were genuinely explored, attempted, rejected, or explicitly
considered.

If none are evidenced, keep the section minimal rather than inventing options.

### Mutation Trigger

This may be prospective, but it must describe concrete conditions that would invalidate the law's
assumptions.

### Hansei

Include only lessons supported by what actually happened.

"No material lesson beyond the law itself" is better than manufactured wisdom.

### Resources

Reference only real resources.

## Contradictions

When artifacts disagree:

1. identify the conflict;
2. prefer direct current implementation and accepted contracts over stale narrative;
3. do not silently rewrite history;
4. if the conflict prevents a trustworthy law, stop with a blocked result.
