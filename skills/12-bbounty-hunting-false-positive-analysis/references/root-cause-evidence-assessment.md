# Root-Cause Evidence Assessment

## Purpose

Assess whether the stated causal explanation is supported by available evidence without requiring source access, reverse engineering, or exploitation.

## Preconditions

- The observed behavior and its evidence have been admitted.
- The causal claim is stated separately from the observation and impact claim.

## Bounded Methodology

1. State the observation, the proposed cause, and the link asserted between them.
2. Identify evidence that directly supports the link, such as an authorized design record, configuration evidence, or a consistent control-relevant observation.
3. Name plausible competing explanations, including intermediary behavior, account state, deployment differences, and measurement error.
4. Classify the cause as `supported`, `hypothesis`, or `not-assessed`; do not infer it from a vulnerability name alone.

## Observation Interpretation

Observed behavior can establish an effect without proving implementation cause. Source or configuration evidence may support a causal explanation only when it is relevant to the affected deployment and time. An unexplained observation remains valid evidence of itself, with causal limits stated.

## False-Positive, Bias, And Scope Controls

- Do not elevate correlation, error text, or a scanner diagnosis into root-cause proof.
- Avoid seeking privileged access or extending testing merely to prove causation.
- Keep remediation suggestions conditional when the cause is not supported.

## Evidence And Handoff

Link each causal conclusion to evidence references and alternatives considered. Handoff unsupported causal claims as hypotheses requiring authorized engineering or triage review.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-115, Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
