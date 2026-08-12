# Safe Confirmation

## Purpose

Decide whether the evidence justifies a minimal authorized confirmation or program review.

## Preconditions

- A mapped candidate path and benign, reproducible observation exist.
- Written authorization explicitly permits the proposed confirmation.
- The confirmation can remain isolated, reversible, and free of mutation, data access, execution, and availability impact.

## Bounded Inert Methodology

Use the [confirmation matrix](../assets/confirmation-matrix.md) to select the least invasive option. Prefer source review, program-provided telemetry, or an isolated test environment. Compare one baseline with one controlled ordinary-input observation. Do not construct prototype-mutation inputs or pursue gadgets, sinks, persistence, or impact escalation.

## Observation And Interpretation

Confirm only an observed handling defect at the stated boundary. If the evidence cannot distinguish a defect from expected framework behavior, classify it as needs-program-review rather than a confirmed vulnerability.

## False-Positive Controls

Require independent repeatability, baseline equivalence, environment isolation, and a documented reason the observation is security-relevant.

## Stop Conditions

Stop immediately on unexpected mutation, shared influence, an authorization boundary, sensitive data, performance degradation, or a request to escalate impact.

## Evidence

Save the matrix decision, authorization basis, baseline and observation records, reproduction conditions, and result classification.

## Remediation

Provide the smallest boundary-specific fix and verification criteria; do not prescribe exploit validation.

## Sources

- https://portswigger.net/web-security/prototype-pollution
- https://owasp.org/www-community/attacks/Prototype_Pollution
