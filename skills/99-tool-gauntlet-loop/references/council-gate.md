# Council Gate

The Gauntlet may use `99-tool-council-of-seven` as an independent adversarial gate after integration and evidence collection.

The Council reviews the candidate. The locked Gauntlet contract determines acceptance.

## Gate Input

Provide:

- locked goal, bar, and constraints;
- integrated candidate or direct access to it;
- criterion-by-criterion PASS/FAIL/UNVERIFIED evidence;
- reference material needed for comparison;
- known limitations and unavailable evidence.

Exclude implementation history, self-ratings, effort spent, prior gate verdicts, and persuasive explanations unless a specific regression requires them.

## Seven Lenses

The Council uses:

- **Skeptic** — hidden failure modes, contradictions, edge cases, unsupported claims.
- **Architect** — structure, dependencies, internal logic, integration quality.
- **Minimalist** — unnecessary complexity, redundancy, avoidable scope.
- **Context Scout** — external context, prior art, standards, missed necessary perspective.
- **Aesthetician** — presentation, usability, naming, style, coherence, finish.
- **Economist** — effort/value, maintainability, operational cost, practical scope.
- **Synthesizer** — evidence-weighted conflict resolution and final Council report.

## Translate Findings

After the Council report, classify each material finding:

### BLOCKING

A finding is blocking when evidence shows violation of:

- the locked goal;
- a mandatory criterion;
- a locked constraint;
- a necessary property without which the goal cannot operate successfully.

### RISK

A material but non-blocking weakness that should remain visible.

### STRETCH

An improvement outside the locked bar. Do not route it into repair unless the contract is explicitly changed.

### DISMISSED

Unsupported, irrelevant, contradicted, or purely preferential.

## Gate Decision

The candidate passes the Council gate only when:

- no blocking Council finding remains;
- every mandatory criterion still has evidence-backed PASS;
- no Council evidence demonstrates that an earlier PASS was false;
- comparison semantics and constraints remain satisfied.

Council consensus alone never creates PASS.

## Degraded Gate

If the companion Council capability is unavailable, perform seven explicitly separated lens reviews when possible and disclose degraded independence. Do not claim the Council skill ran.
