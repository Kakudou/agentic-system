# Validation and Evidence

## Purpose and Preconditions

Use this to decide whether a security-relevant observation can be safely confirmed and reported. Require a written authorization, a recorded baseline, and a confirmation that remains non-destructive and within scope.

## Bounded Safe Methodology

Reproduce only the exact normal-use interaction that produced the observation. Compare its result with the baseline, then document the smallest factual difference. If a second observation would need altered input, a state-changing method, elevated access, automation, or a wider target set, stop and request authorization rather than proceeding.

## Observations and Interpretation

Evidence should show the condition, the affected route or context, and the reason a security boundary may be weakened. State uncertainty explicitly. A configuration deviation without a plausible affected boundary is an informational hardening observation, not necessarily a vulnerability.

## False-Positive Controls

- Reproduce within the same authorized context and record environmental variables.
- Separate server response facts from browser-rendered facts.
- Exclude transient failures, cached responses, account-specific content, and unverified assumptions.
- Ask the owner to confirm intended behavior when this is safer than further testing.

## Stop Conditions

Stop immediately for unexpected sensitive data exposure, indication of active compromise, user-impacting errors, rate-limit warnings, any potential state change, or uncertainty about authorization. Preserve only the minimum evidence needed and follow the program's disclosure path.

## Evidence

Use a redacted timeline: authorization, target, normal baseline, observation, reproduction, comparison, affected trust boundary, false-positive checks, limitations, and stop/escalation decision. Do not retain secrets, session tokens, personal data, or unnecessary body content.

## Remediation

Describe the desired security property, affected layer, and verification criterion. Recommend a regression test using benign representative behavior. Avoid speculative fixes and severity claims unsupported by the observed evidence.

## Sources

- PortSwigger, [How to report vulnerabilities](https://portswigger.net/web-security/reporting-vulnerabilities)
- OWASP Web Security Testing Guide, [Reporting](https://owasp.org/www-project-web-security-testing-guide/)
