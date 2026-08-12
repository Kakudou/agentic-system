# Pattern Interpretation And Confidence Controls

## Purpose

Interpret repeated or contrasting supplied observations without confusing a recognizable pattern with a confirmed weakness. Use this reference to produce falsifiable claims and calibrated confidence.

## Preconditions

- Scope and evidence are admitted.
- Each compared observation has source, asset, time, and relevant conditions.
- The task is synthesis or planning, not active verification.

## Evidence-Led Method

1. Describe the baseline behavior and the observed difference separately.
2. Identify the condition that changed and the security property that may differ.
3. Form a conditional statement: if the observed condition is enforced inconsistently, the named asset may violate the property.
4. Define evidence that would support and evidence that would disconfirm the statement.
5. Rate observation confidence separately from inference confidence in the matrix.

## Interpretation And Uncertainty

Patterns may result from expected business rules, caching, localization, account state, staged rollout, error handling, or measurement differences. A single response, timing difference, or client-side artifact is insufficient to infer a security impact.

## False-Positive And Bias Controls

- Compare like-for-like conditions and record material differences.
- Prefer independent evidence sources over repeated copies of one artifact.
- Name a benign explanation and the evidence that would distinguish it.
- Avoid confirmation bias: a familiar vulnerability label must not replace a causal explanation.

## Scope And Privacy Limits

Do not suggest concurrency, fuzzing, privilege changes, bulk access, or unapproved inputs. Exclude secrets, personal data, and unrelated assets from evidence records.

## Evidence And Handoff

Handoff must distinguish observed facts, interpretation, assumptions, alternatives, confidence, and the minimum authorized question for validation.

## Sources

- [OWASP Web Security Testing Guide: Testing for Error Handling](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/08-Testing_for_Error_Handling)
- [PortSwigger Web Security Academy: Essential skills](https://portswigger.net/web-security/essential-skills)
