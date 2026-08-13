---
name: 12-bbounty-webvuln-race-condition
description: Assess authorized stateful web workflows for race conditions using bounded, low-impact validation and evidence-driven reporting.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Race-Condition Assessment

## Purpose

Assess whether an authorized stateful workflow preserves its invariants when requests overlap. Favor a controlled fixture or provider-approved test path. Do not automate concurrency, use timing payloads, or pursue value extraction.

## Prerequisites

- Written authorization and program scope covering the target and test method.
- A disposable test account and a reversible, low-impact state transition.
- A defined invariant, observation method, cleanup owner, and stop threshold.

## Workflow

1. **Choose a safe transition.** Select a reversible operation with no external notifications, financial effect, inventory allocation, privilege change, or impact on other users. Map its preconditions, states, side effects, and invariant with the [state-transition worksheet](assets/state-transition-worksheet.md). For state-machine or partial-construction concerns, read [state-transition mapping](references/state-machine.md) and [partial construction](references/partial-construction.md).
2. **Form a falsifiable hypothesis.** Identify the check, mutation, and commit boundary that could overlap; specify the expected sequential result and the single low-impact observation that would disprove it. Use the [race-window guide](references/race-basics.md) and [race-window worksheet](assets/state-transition-worksheet.md#race-window-hypothesis).
3. **Set confirmation bounds.** Prefer a documented fixture. If the program explicitly permits live confirmation, use the smallest manual confirmation necessary, one isolated test identity, and a predeclared request and side-effect cap. Consult [controlled confirmation](references/race-techniques.md) and the [confirmation matrix](assets/confirmation-matrix.md). Do not increase volume, alter timing, or try alternate attack variants after an ambiguous result.
4. **Interpret state, not response timing.** Compare before and after state, authoritative audit records, idempotency behavior, and cleanup outcome against the sequential baseline. Use [validation and false-positive controls](references/validation.md) and [response interpretation](references/synchronization.md).
5. **Stop, clean up, and report.** Stop immediately on unexpected side effects, state uncertainty, rate limiting, authorization ambiguity, or any impact outside the fixture. Follow the [cleanup, stop, and evidence checklist](assets/cleanup-stop-evidence-checklist.md), then document the issue and remediation using [prevention guidance](references/prevention.md) and the [remediation lookup](assets/remediation-lookup.md).

## Evidence

- Scope authorization, test identity, transition map, hypothesis, and declared limits.
- Sequential baseline and bounded confirmation records, with timestamps and redacted request identifiers.
- Before/after authoritative state, idempotency or audit evidence, cleanup result, and observed invariant result.
- A clear distinction between confirmed impact, inconsistent behavior, and unverified suspicion.

## Output

```yaml
race_condition_assessment:
  target: string
  authorization: string
  transition_and_invariant: string
  hypothesis: string
  method_and_limits: string
  observations: [string]
  result: confirmed | not_reproduced | inconclusive | stopped
  cleanup: complete | not_needed | escalated
  evidence: [string]
  remediation: [string]
```

## Supplemental Index

- [Race basics](references/race-basics.md)
- [Controlled confirmation](references/race-techniques.md)
- [State-transition mapping](references/state-machine.md)
- [Response interpretation](references/synchronization.md)
- [Partial construction](references/partial-construction.md)
- [Validation](references/validation.md)
- [Prevention](references/prevention.md)
- [PortSwigger race-condition research](references/race-payloads.md)
