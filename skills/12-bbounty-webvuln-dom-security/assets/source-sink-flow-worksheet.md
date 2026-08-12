# Source-to-Sink Flow Worksheet

## Purpose and Preconditions

Use this static worksheet after authorization is recorded and before runtime confirmation. It documents one source-to-receiver path per row; it is not a test script.

| Flow ID | Route/feature | Source and trust boundary | Receiver/context | Transformations | Static evidence | Runtime observation | Status |
|---|---|---|---|---|---|---|---|
| F-01 |  |  |  |  |  |  | unreviewed |
| F-02 |  |  |  |  |  |  | unreviewed |
| F-03 |  |  |  |  |  |  | unreviewed |

## Bounded Test Process

1. Complete source, receiver, and static-evidence fields before observing runtime behavior.
2. Use the approved inert marker for only one row at a time through its normal input path.
3. Record `rendered_as_text`, `encoded`, `rejected`, `not_confirmed`, or `stop` in the observation field.
4. End the row on a stop condition; do not expand it into a multi-input or state-changing test.

## Browser/Runtime Interpretation

- A visible marker proves propagation only. It does not prove unsafe parsing or execution.
- State the actual final context and transformations, including framework rendering boundaries.

## False-Positive Controls

- Do not merge routes, source values, or similarly named variables into one row.
- Link each conclusion to a script location and an observed route.

## Evidence

Attach authorization reference, timestamp, browser version, script version/hash, redacted observation, and report evidence ID to each completed row.
