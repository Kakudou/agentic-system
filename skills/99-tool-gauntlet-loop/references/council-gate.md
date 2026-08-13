# Council Gate Reference

Read this when invoking `99-tool-council-of-seven`, translating its report into a Gauntlet decision, or using the degraded fallback.

## 1. Role boundary

The Council is an **independent adversarial quality gate**.

It does not:

- implement repairs;
- execute the builder's work on the builder's behalf;
- redefine the user's goal;
- lower hard constraints;
- add arbitrary scope and then reject the candidate for lacking it.

The Gauntlet orchestrator owns execution and routing. Ginshō owns Council synthesis. The locked contract owns acceptance.

## 2. Invocation packet

Invoke `99-tool-council-of-seven` with:

### Submission

The actual integrated candidate, or the closest directly inspectable representation the environment supports.

### Context

Provide only:

- locked goal;
- mandatory/optional criteria;
- comparison semantics;
- hard constraints and non-goals;
- fixed reference/bar;
- Evidence Pack;
- explicit instruction that claims without evidence must not receive credit.

Do not include builder identity, builder reasoning, attempt count, prior Council verdict, or a statement such as "this is the improved version."

If cost itself is a criterion, include objective cost/budget evidence for Kinshō without revealing irrelevant implementation history.

## 3. How the seven lenses map to a gate

Use the existing Council archetypes without replacing them:

- **Keima / Skeptic:** hidden failure modes, contradictions, edge cases, unsupported claims.
- **Kakugyō / Architect:** structure, dependencies, internal logic, integration quality.
- **Fuhyō / Minimalist:** unnecessary complexity, redundancy, avoidable scope, accidental bloat.
- **Kyōsha / Visionary:** external context, prior art, standards, missed necessary perspective.
- **Hisha / Aesthetician:** presentation, usability, naming, style, coherence, finish.
- **Kinshō / Economist:** effort/value, maintainability, operational cost, practical scope.
- **Ginshō / Synthesizer:** resolves conflict and produces the Council Report.

A lens only blocks the Gauntlet when its finding maps to the locked contract or a derived necessary property.

## 4. Evidence precedence

When Council opinions conflict, translate the result using this precedence:

1. hard constraints and objective safety/correctness requirements;
2. deterministic evidence;
3. direct artifact evidence;
4. explicit user bar/reference;
5. structured qualitative judgment;
6. aesthetic or strategic preference not required by the contract.

Do not decide by simple 4-of-7 voting. The archetypes inspect different failure classes, so one well-evidenced critical finding can outweigh broad approval.

## 5. Finding classification

After Ginshō produces the Council Report, classify each material finding:

- **BLOCKER:** proves a mandatory criterion FAIL/UNVERIFIED, a hard constraint violation, or a derived necessary-property failure.
- **REPAIR:** material issue that can be fixed within the current contract and is needed for PASS.
- **RISK:** not currently a failure, but evidence suggests fragility worth documenting or retesting.
- **STRETCH:** beneficial improvement beyond the required bar.
- **DISMISSED:** opinion contradicted by stronger evidence or outside the locked scope.

Preserve meaningful dissent in the final report even when it does not block PASS.

## 6. Gate decision

The Council Report itself is not the only acceptance mechanism. Combine it with the criterion matrix.

### PASS

All mandatory criteria have valid PASS evidence, constraints pass, comparison semantics are satisfied, and no Council blocker invalidates those results.

### REJECT FOR REPAIR

One or more blockers/repairs exist and a viable in-contract repair path is available.

### TERMINATE

Use FAILED, BLOCKED, BUDGET_EXHAUSTED, or HUMAN_DECISION_REQUIRED according to `references/convergence.md`.

## 7. Council-discovered missing requirement

Ask: "Would the stated goal still be successfully achieved if this issue remained?"

If no, and the issue is objectively necessary, treat it as a derived necessary property and map it to the most relevant criterion or create an explicit derived criterion in the ledger.

If yes, it is a stretch suggestion. Do not move the finish line.

Examples:

- API crashes on a common required request although crash handling was not named: blocker; the API goal is nonfunctional.
- Report would look nicer with an infographic not requested by the bar: stretch.
- Plan assumes a nonexistent dependency: blocker; feasibility is invalid.
- Creative text could include another subplot: stretch unless the bar requires it.

## 8. Degraded fallback when `99-tool-council-of-seven` is unavailable

Do not claim the Council ran.

Perform seven independent review passes using the seven lenses above. Keep each pass bounded and focused. If the host supports subagents, use fresh-context reviewers. If not, separate the passes explicitly and avoid exposing one lens's conclusion to the next until synthesis.

Then synthesize:

1. CONSENSUS
2. DISSENT
3. ALTERNATIVES
4. VERDICT

Mark the gate:

`Council mode: DEGRADED — companion skill unavailable`

Lower confidence by one level because the dedicated Council workflow was not used.

## 9. Council frequency

The full Council should gate integrated candidates, not every local patch. Local critics catch obvious gaps cheaply; the Council catches system-level quality failures and false confidence.
