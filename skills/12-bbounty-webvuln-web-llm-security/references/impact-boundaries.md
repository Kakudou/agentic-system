# Impact Boundaries

## Purpose And Preconditions

Use after a benign observation to describe impact without speculative escalation. Require evidence, stated scope, and known exclusions.

## Bounded Benign Methodology

Classify the demonstrated result as presentation behavior, control uncertainty, or observed boundary failure. Identify the nearest hypothetical consequence only as conditional and list what was not tested. Do not validate by seeking additional data, privileges, tool access, or actions.

## Observations And Interpretation

Impact is bounded by what occurred. A content-handling anomaly may indicate risk, but it is not equivalent to disclosure or unauthorized action. Report a higher impact only when an authorized, non-sensitive confirmation directly demonstrates that consequence.

## False-Positive Controls

Separate model-generated claims from application-enforced outcomes. Check whether the effect was user-visible only, whether an independent authorization layer intervened, and whether test fixtures constrained behavior.

## Stop Conditions

Stop any effort to establish impact through sensitive data, cross-account access, tool invocation, state change, or service stress. Escalate instead.

## Evidence

Capture the observed outcome, causal uncertainty, scope constraints, untested steps, and the rationale for the confidence level.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM Top 10](https://genai.owasp.org/llm-top-10/)
