# Evidence, Validation, Prevention, And Handoff

## Purpose

Turn an authorized, minimally collected public observation into a report that an asset owner can validate and remediate without receiving sensitive material or exploit instructions.

## Preconditions

- The asset is in scope and attribution evidence is recorded.
- The observation was passive or explicitly approved as low-impact.
- A sanctioned reporting channel and owner or triage route are known.

## Method

1. Preserve the observation time, public URL or asset identifier, ordinary-browser or approved-console method, and a redacted response summary.
2. State the expected boundary and the observed boundary. Describe access as public, authenticated, or indeterminate; do not retrieve content to prove it.
3. Rate confidence with the matrix and name plausible alternatives such as CDN caching, provider-owned shared endpoints, stale DNS, delegated hosting, or an authorization page.
4. Hand off the smallest evidence set to the authorized owner. Recommend validation in the owner's cloud account, logging review, least privilege, and deny-by-default access controls.

## Interpretation And Scope Controls

- A provider hostname, certificate, or response header is attribution evidence, not proof that the target owns the resource.
- A public endpoint is not automatically a vulnerability. Report an exposure only when the observed boundary conflicts with documented scope, intended audience, or owner-confirmed policy.
- Do not infer data sensitivity, tenant access, privilege, or impact from naming alone.

## Privacy Limits

Do not retain response bodies containing data, tokens, identifiers, or internal topology. Use redacted headers, screenshots with sensitive fields masked, and a hash only when the program permits it. Stop and escalate when sensitive data is displayed.

## Evidence And Handoff

Use `assets/remediation-handoff-template.md`. Include the authorization reference, attribution evidence, method, redacted observation, confidence, scope caveats, and recommended owner-side validation. Report urgency based on verified exposure and data classification supplied by the owner, not speculation.

## Sources

- [AWS Well-Architected Security Pillar](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
- [AWS IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
