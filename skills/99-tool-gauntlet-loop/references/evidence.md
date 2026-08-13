# Evidence and Grading Reference

Read this whenever defining verification, assembling an Evidence Pack, or deciding PASS/FAIL.

## 1. Evidence hierarchy

Prefer stronger evidence over weaker evidence:

1. **Deterministic observation** — tests, validators, measurements, schema checks, compiler/runtime results, exact counts, checksums, query results.
2. **Direct artifact inspection** — reading the actual text/code/data, viewing the actual image/render, exercising the actual interaction.
3. **Reference comparison** — side-by-side or criterion-by-criterion comparison against the locked reference.
4. **Structured expert judgment** — rubric-based qualitative review with concrete citations to the artifact.
5. **Builder claim** — useful only as a lead for what to inspect; never sufficient proof.

Use the strongest available method appropriate to the criterion.

## 2. PASS / FAIL / UNVERIFIED

### PASS

Assign PASS only when the required evidence exists and supports the criterion.

### FAIL

Assign FAIL when evidence shows the criterion is not satisfied.

### UNVERIFIED

Assign UNVERIFIED when the agent cannot obtain enough evidence either way.

Examples:

- A service was modified but cannot be started: behavioral criteria are UNVERIFIED, not PASS.
- A factual claim cannot be checked against an available source: factual correctness is UNVERIFIED.
- A visual comparison is required but the critic cannot access either visual: comparative criterion is UNVERIFIED.

For mandatory criteria, both FAIL and UNVERIFIED block final PASS.

## 3. Evidence record

For each criterion, capture:

```yaml
criterion: C1
status: PASS | FAIL | UNVERIFIED | REGRESSED
method: test | measurement | inspection | comparison | rubric
observation: Concise factual result
evidence: Concrete pointer, excerpt, result, or artifact reference
evaluator: local-critic | tool | council | human
confidence: high | medium | low
```

Do not let confidence replace evidence. High-confidence speculation is still UNVERIFIED.

## 4. Comparative evidence

When the bar is a reference artifact:

1. lock the reference version if possible;
2. define relevant comparison dimensions;
3. compare the actual candidate, not a description of it;
4. blind labels where practical (`A` and `B` rather than "reference" and "new");
5. randomize ordering where the environment allows;
6. record which dimensions won/lost/tied and why;
7. reveal identity only after the judgment is recorded.

If true blind comparison is impossible, disclose that limitation. Do not fabricate blindness.

## 5. Subjective evidence

For style, aesthetics, coherence, taste, usefulness, or similar criteria:

- anchor the criterion with observable descriptors;
- cite concrete parts of the artifact;
- distinguish preference from defect;
- use the Council for multi-angle judgment;
- preserve dissent when reasonable reviewers can disagree.

A subjective criterion can still be mandatory, but the report should state the judgment basis and confidence.

## 6. Scores

Scores may help prioritize repairs but are never the primary gate.

Rules:

- mandatory PASS is conjunctive: all required criteria must pass;
- do not average FAIL into a high total score;
- do not convert UNVERIFIED to a midpoint score;
- if weights exist, use them only among already-valid dimensions or to prioritize effort;
- report raw criterion states alongside any aggregate.

## 7. Evidence freshness

Evidence becomes stale when:

- the artifact changed in a way that can affect the criterion;
- a dependency changed;
- integration changed interfaces or behavior;
- the reference/bar changed by user authorization;
- the verification environment materially changed.

Invalidate and rerun stale checks rather than carrying old PASS results forward.

## 8. Evidence Pack minimization

The critic-facing packet should be sufficient but not persuasive.

Include:

- locked goal/bar/constraints;
- candidate or direct access instructions;
- criterion table;
- raw evidence needed to reproduce or inspect findings;
- reference material;
- known failures/unverified items.

Exclude:

- builder reasoning;
- celebratory summaries;
- "what changed" marketing language;
- effort or token cost unless Economist is explicitly judging a cost constraint;
- previous Council verdicts on a fresh gate.

## 9. Fail closed on evidence

When evidence is missing because of tool/access limits, do not infer success from plausibility. If the missing evidence concerns a mandatory criterion, final state is normally BLOCKED unless another valid verification method exists.
