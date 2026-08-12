# State-Transition Mapping

## Purpose and Preconditions

Use for workflows with more than one state, especially where a request may expose intermediate state. Require authorization, a known test identity, and a reversible transition.

## Safe Bounded Methodology

List states, entry checks, durable writes, asynchronous work, terminal states, and compensating cleanup. Define an invariant for every transition, such as one actor, one accepted transition, and one durable record. Map observations through documented interfaces or authorized audit data; do not probe privileged or other-user states.

## State And Idempotency Interpretation

Intermediate processing is not itself a flaw. A finding requires evidence that an intermediate state accepts an operation forbidden by the invariant or that the terminal state is inconsistent. Replays should converge on the original terminal result without duplicate durable effects.

## False-Positive Controls And Limits

Distinguish asynchronous completion, read replicas, UI optimism, and delayed audit ingestion from state exposure. Use only a fixture or an explicitly permitted low-impact observation; stop if an intermediate state may affect another user.

## Evidence

Preserve the state diagram, transition identifiers, baseline and final state, authoritative logs, and cleanup verification.

## Remediation

Make intermediate states non-authorizing, bind checks and writes transactionally, and publish only committed state.

## Source

- PortSwigger, [Smashing the state machine](https://portswigger.net/research/smashing-the-state-machine)
