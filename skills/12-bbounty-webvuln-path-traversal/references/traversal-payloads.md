# Marker Test Cases

## Purpose And Preconditions

Use this replacement for a payload catalog to define inert, program-authorized marker comparisons. Do not use it to retrieve files, enumerate directories, or construct bypass strings. Require a marker owned by the tester or supplied by the program and an approved endpoint.

## Bounded Marker Workflow

Choose only cases applicable to the feature, recording each as a label rather than a reusable request string:

| Case | Controlled variable | Safe success condition |
|---|---|---|
| Baseline | Ordinary approved marker identifier | Expected marker response |
| Representation | One equivalent marker representation | Same handler and marker-only response |
| Decode boundary | One declared transport encoding form | Documented, consistent decode behavior |
| Path semantics | One documented separator or segment rule | Rejection or contained marker resolution |
| Extension rule | Marker name within the permitted type | Validation matches final resolved marker |
| Link/archive feature | Existing program-provided safe fixture only | Contained marker resolution or rejection |

Make no more requests than necessary to compare a case with its baseline. Do not combine cases unless a prior marker-only observation requires confirmation.

## Normalization And Decoding Model

Treat every comparison as a model of stages: received bytes, decoded value, validated identifier, joined path, canonical path, resolved object, and returned response. The test is informative when one stage handles the authorized marker inconsistently with another.

## Observations And Interpretation

Expected outcomes are normal marker access or a consistent rejection. A changed status or body alone is inconclusive. Confirmation requires repeatable access to only the authorized marker in a way that contradicts the documented path-selection boundary.

## False-Positive Controls

Pair each case with the baseline and, when useful, an invalid same-shape marker. Verify routing, authentication, cache state, and response handler identity. Stop on non-marker data, unexpected state change, or rate-limit signals.

## Evidence And Remediation

For each case retain the label, marker ownership, sanitized request representation, response metadata, interpretation, and cleanup. Remediate with opaque identifiers, controlled single-pass parsing, containment checks after canonical resolution, and regression tests.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
