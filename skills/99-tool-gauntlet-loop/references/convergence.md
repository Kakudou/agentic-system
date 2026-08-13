# Convergence, Repair, and Stopping Reference

Read this after a Council rejection, when findings repeat, when regressions appear, or when any budget/limit is near.

## 1. Targeted repair routing

Convert each blocking finding into a repair ticket. A ticket should name:

- criterion or constraint affected;
- observed gap;
- evidence;
- required outcome;
- minimal allowed scope;
- owner/workstream;
- dependencies;
- verification method;
- regressions to rerun.

Do not send the entire Council transcript to every builder. Give each builder the smallest actionable packet that preserves necessary context.

## 2. Repair ordering

Default priority:

1. hard constraint or safety/correctness blockers;
2. failures that invalidate other evidence;
3. integration blockers;
4. highest-impact mandatory gaps;
5. lower-impact mandatory gaps;
6. optional improvements only after the candidate already passes, and only if budget allows or the user asked.

When one repair is likely to invalidate several passing criteria, do it before cosmetic or isolated repairs so regressions are discovered early.

## 3. Regression set

For every repair, identify:

- directly affected criterion;
- dependency criteria;
- interface/integration criteria;
- previously fixed failure modes likely to recur.

Rerun this set before considering the ticket closed.

A previous PASS that fails after repair becomes `REGRESSED` and is a blocker.

## 4. Convergence ledger

Track per Council gate:

- gate number;
- blocker set;
- severity/materiality;
- criterion states;
- evidence changes;
- repairs attempted;
- regressions introduced/fixed;
- measurable delta from previous gate.

Do not expose the full ledger to a fresh critic.

## 5. Measurable improvement

Improvement may be:

- a failed criterion becomes PASS;
- an UNVERIFIED criterion becomes verifiable;
- a quantitative metric moves toward threshold;
- a comparative dimension moves from lose to tie/win;
- a material Council finding is eliminated;
- evidence becomes stronger or more complete;
- a regression is removed without creating another blocker.

Rephrasing an explanation or changing implementation without observable effect is not improvement.

## 6. Stagnation policy

If the same material gap survives two consecutive Council gates without measurable improvement:

1. stop repeating the same repair strategy;
2. identify the root cause: wrong decomposition, impossible constraint interaction, insufficient tool/access, bad reference interpretation, or implementation strategy;
3. choose a clearly different strategy if one exists;
4. preserve passing work unless the new strategy requires replacement.

If the same material gap survives a third Council gate:

- return `HUMAN_DECISION_REQUIRED` when a trade-off or requirement choice is needed;
- return `BLOCKED` when capability/access/evidence is missing;
- return `FAILED` when evidence supports infeasibility under the locked constraints;
- return `BUDGET_EXHAUSTED` if a user limit caused the stop.

Do not continue an unbounded loop.

## 7. Terminal state decision tree

### PASSED

Use only when every mandatory criterion is PASS with current evidence and the Council gate reveals no blocker.

### BLOCKED

Use when progress requires unavailable information, access, environment, tool, dependency, or verification capability.

Include exactly what would unblock the run.

### BUDGET_EXHAUSTED

Use when a user-defined time, iteration, compute, token, money, or other resource limit is reached before PASS.

Report the best candidate and remaining gaps; do not relabel it successful.

### HUMAN_DECISION_REQUIRED

Use when the contract permits multiple incompatible trade-offs or a subjective choice and no rule authorizes the agent to pick one.

Examples:

- performance target and hard cost ceiling cannot both be met with current architecture, but either constraint could be relaxed;
- two stylistic directions both satisfy measurable criteria but the user must choose identity/voice;
- a requirement is internally ambiguous and materially changes implementation.

### FAILED

Use when evidence supports that the goal/bar cannot be achieved under the locked constraints with available viable approaches.

Failure should be rare and evidence-backed; do not use it merely because one implementation attempt failed.

## 8. User-authorized contract change

If the user changes the bar or constraints mid-run:

1. record the old and new contract;
2. identify which evidence remains valid;
3. invalidate affected evidence;
4. update workstreams and verification plan;
5. continue from the smallest reusable state.

Do not pretend the original run passed if the success condition was relaxed.
