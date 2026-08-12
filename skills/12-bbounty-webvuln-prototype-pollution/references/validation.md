# Validation And Evidence

## Purpose

Produce a reviewable record that distinguishes observed behavior, inference, and untested impact.

## Preconditions

- Assessment scope and evidence-retention rules are known.
- A baseline and at least one bounded observation have been captured.

## Bounded Inert Methodology

Record one path at a time: source, parser or merge boundary, consumer, baseline, observation, and control. Redact credentials, session material, personal data, and unrelated response content. Use the [evidence and stop checklist](../assets/evidence-stop-checklist.md) before reporting.

## Observation And Interpretation

Evidence supports a confirmed result only when it shows a reproducible, authorized path and an unintended security-relevant effect. Otherwise report no issue observed or needs-program-review, with the exact uncertainty.

## False-Positive Controls

Require a fresh baseline, repeatable result, runtime classification, component/version evidence, and an alternative explanation review.

## Stop Conditions

Stop collection when evidence includes sensitive material, collection itself changes state, or further proof would require unsafe probing.

## Evidence

Include authorization reference, target, timestamps, test-account boundary, redacted artifacts, controls, confidence, and remediation linkage. Retain only program-required artifacts.

## Remediation

Tie each remediation to the demonstrated boundary and define a safe regression check using normal and rejected ordinary fields.

## Sources

- https://portswigger.net/web-security/prototype-pollution
- https://owasp.org/www-community/attacks/Prototype_Pollution
