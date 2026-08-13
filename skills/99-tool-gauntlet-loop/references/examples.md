# Worked Gauntlet Examples

Read this only when the current task is hard to translate into a contract, evidence plan, or workstream layout.

These examples illustrate mechanics; they are not domain requirements.

## Example A — software feature against contract tests

### Input

- **Goal:** implement a CSV import endpoint.
- **Bar:** all provided API contract tests pass; 10k-row import completes under 3 seconds; malformed rows produce the specified error schema.
- **Constraints:** Python 3.12, existing dependencies only, no database schema change.

### Contract shape

- C1 behavioral, mandatory: contract tests pass.
- C2 threshold, mandatory: 10k rows < 3 s in stated environment.
- C3 source-of-truth, mandatory: error response matches schema.
- Hard constraints: runtime/dependencies/schema.

### Workstreams

Keep parsing + validation together if they share behavior. Benchmarking may be independent. Integration verifies endpoint, database behavior, and regression tests.

### Evidence

Test output, benchmark result, schema comparison, dependency diff. "The endpoint is optimized" is not evidence.

### Council gate

A Skeptic-discovered crash on a valid edge-case request is a blocker even if the exact case was absent from tests, because the endpoint goal would be nonfunctional. Aesthetician preferring different response naming is not a blocker if the schema fixes the names.

## Example B — executive report against a reference

### Input

- **Goal:** produce a six-page executive incident report.
- **Bar:** match a supplied exemplar on clarity, evidence density, decision usefulness, and visual hierarchy; include five required facts; contain no unsupported causal claims.
- **Constraints:** six pages maximum, nontechnical audience, confidential identifiers omitted.

### Contract shape

- C1-C5 binary/source-backed required facts.
- C6 rubric/comparative: clarity.
- C7 rubric/comparative: decision usefulness.
- C8 binary: no unsupported causal claim.
- C9 comparative: visual hierarchy matches reference quality.

### Workstreams

Research/fact extraction and narrative structure can begin separately, but final prose and visual hierarchy must be integrated before Council review.

### Evidence

Source mapping for facts, direct excerpts, page count, blind A/B comparison against exemplar, Council qualitative review.

### Council gate

Context Scout may recommend industry background; it is stretch unless required to understand the incident or by the bar. A factual contradiction found by Skeptic is a blocker.

## Example C — product landing page against a visual benchmark

### Input

- **Goal:** produce a responsive landing page for an existing product.
- **Bar:** match the supplied reference on hierarchy, perceived polish, mobile clarity, and interaction completeness; all required product content must be present.
- **Constraints:** existing design tokens, WCAG AA for required flows, no new JavaScript dependency.

### Workstreams

Content mapping, layout implementation, and interaction states may fan out if interfaces are fixed. Integration must render desktop/mobile states before the Council sees it.

### Evidence

Rendered screenshots, responsive inspection, accessibility checks, dependency diff, side-by-side reference comparison.

### Council gate

Do not let Aesthetician approve from source code alone; the visual bar requires rendered evidence. A gorgeous page that violates required accessibility remains FAIL.

## Example D — operational rollout plan

### Input

- **Goal:** produce an executable migration rollout plan for 40 services.
- **Bar:** every service has owner, sequence, dependency, validation, and rollback; no circular sequence; plan fits the maintenance window; reference is the organization's accepted prior rollout format.
- **Constraints:** four-hour window, two operators, no simultaneous migration of paired HA nodes.

### Workstreams

Inventory/dependency mapping can be parallelized from scheduling only after the dependency model stabilizes. Final sequencing is system-level integration work.

### Evidence

Service coverage table, dependency graph inspection, schedule duration calculation, constraint checks, rollback completeness, comparison to prior accepted format.

### Council gate

Economist can flag operator overload as a practical blocker if the plan cannot be executed by two operators. Extra dashboards are stretch unless necessary for the stated validation steps.
