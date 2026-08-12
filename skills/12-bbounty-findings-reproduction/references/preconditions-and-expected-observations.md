# Preconditions And Expected Observations

## Purpose And Preconditions

Record which non-secret conditions were present when evidence was captured and distinguish expected behavior from the result actually observed. Require admitted evidence and a documented observation context; do not create a precondition by guessing from a result.

## Documentation Methodology

For each condition, record its category, source, whether it was directly observed, and its confidence. Record the expected observation and its basis separately from the actual observed result and linked evidence. Note relevant environmental dependencies, timing limits, feature state, and constraints only at the level needed for review.

## False-Claim And Privacy Controls

- Do not call a condition required unless evidence or an authoritative source supports it.
- Do not equate an expected result with an observed result.
- Do not include account identifiers, secrets, session data, or instructions for changing state.
- Mark unknown, conflicting, or unverified conditions explicitly.

## Evidence And Handoff

Complete the [precondition/observation confidence matrix](../assets/precondition-observation-confidence-matrix.md). Handoff unsupported preconditions and competing explanations as validation questions.

## Sources

- OWASP Web Security Testing Guide, [Testing framework](https://owasp.org/www-project-web-security-testing-guide/)
- ISO/IEC 29147, [Vulnerability disclosure](https://www.iso.org/standard/72311.html)
