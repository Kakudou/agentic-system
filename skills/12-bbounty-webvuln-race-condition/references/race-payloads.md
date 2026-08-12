# PortSwigger Race-Condition Research

## Purpose and Preconditions

This is a reading guide, not a payload catalog. Use it when an authorized assessment needs conceptual background after a bounded hypothesis exists.

## Safe Bounded Methodology

Read the sources to identify applicable patterns, then translate only the state model and defensive lesson into the worksheet. Do not copy attack sequences, timing instructions, request counts, or examples into live testing. Use a controlled fixture or explicitly permitted low-impact confirmation instead.

## State And Idempotency Interpretation

Focus on whether one logical operation produces exactly one durable outcome and whether retries return the original outcome without reapplying the transition. Treat transport-level simultaneity as context, not evidence.

## False-Positive Controls And Limits

External research does not establish target behavior. Do not infer vulnerability from matching endpoint names or response latency. Preserve program limits and stop conditions from the assessment workflow.

## Evidence

Cite the relevant source concept separately from target evidence. Target evidence must include the mapped invariant and authoritative before/after state.

## Remediation

Use source guidance to explain atomic state transitions, uniqueness constraints, idempotency, and compensation, tailored to the observed invariant.

## Sources

- PortSwigger, [Race conditions](https://portswigger.net/web-security/race-conditions)
- PortSwigger, [Smashing the state machine: the true potential of web race conditions](https://portswigger.net/research/smashing-the-state-machine)
