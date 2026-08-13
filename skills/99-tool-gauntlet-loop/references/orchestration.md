# Orchestration Reference

Read this for workstream decomposition, multi-workstream execution, local critique, and integration.

## 1. Decompose from the contract

First identify:

- criteria that can be satisfied independently;
- shared dependencies;
- interfaces between components;
- criteria that exist only at whole-artifact level;
- expensive or risky actions that should happen late;
- verification that can run early and cheaply.

Create the smallest number of workstreams that gives real independence. More workstreams are not automatically better.

### Good workstream boundaries

A workstream should have:

- a clear output;
- explicit owned criteria;
- defined inputs/dependencies;
- a local verification method;
- minimal hidden coupling to other workstreams.

If two workstreams repeatedly modify the same state or cannot be verified separately, merge them.

## 2. Parallelism rules

Parallelize when all are true:

- outputs can be produced without conflicting writes;
- interfaces are known;
- local evidence can be collected independently;
- integration cost is lower than the time saved.

Serialize when:

- one result determines another's requirements;
- work mutates shared state;
- the task is small enough that fan-out overhead dominates;
- safety or destructive operations require ordered validation.

## 3. Builder packet

Give a builder only relevant context:

- goal summary;
- owned criteria;
- hard constraints;
- relevant reference slice;
- dependencies/interfaces;
- available tools/materials;
- required output location/format;
- local verification target.

Do not ask builders to decide whether the entire Gauntlet passes.

## 4. Local critic

Use a separate fresh-context critic whenever the host supports it economically.

The local critic receives:

- owned criteria;
- actual output;
- local evidence;
- relevant constraints/reference.

It returns:

- largest material gap first;
- criterion affected;
- severity;
- concrete evidence;
- specific retest condition.

Avoid broad aesthetic essays during local review. The purpose is fast convergence before paying for a full Council gate.

## 5. Local repair loop

Use:

`BUILD -> VERIFY -> CRITIQUE -> REPAIR -> RETEST`

Rules:

- repair the largest blocking gap first;
- preserve passing behavior unless the repair requires an explicit trade-off;
- after each repair, rerun affected criteria and dependencies;
- stop local looping if the gap requires integration context or a contract decision;
- never self-certify because the code/text/design "looks right" after an edit.

## 6. Integration

Integration is not a copy operation. Verify the assembled candidate as a new artifact.

Check at least:

- interface compatibility;
- end-to-end behavior;
- cross-component consistency;
- global coherence/style where relevant;
- shared constraints;
- regression of previously passing criteria;
- missing pieces that only become visible as a whole.

If integration changes a component materially, invalidate stale evidence for affected criteria.

## 7. Milestone Council gates

The Council is expensive. Default to a full Council gate only when:

- a coherent integrated candidate exists;
- a major milestone changes the whole artifact;
- local critics disagree on a system-level issue;
- the candidate may be ready to ship;
- a previous Council rejection has been materially repaired.

Do not invoke the Council after trivial edits or while obvious mandatory failures remain, unless the user explicitly wants diagnosis rather than convergence.

## 8. Context separation

### Builders may know

- prior implementation attempts;
- dependency history;
- repair tickets;
- technical constraints required to make changes efficiently.

### Critics should normally not know

- builder identity;
- builder confidence;
- time/effort spent;
- rationalizations for compromises;
- whether the artifact is "supposed" to be improved;
- previous critic verdicts.

This asymmetry preserves productive continuity for builders and independence for critics.
