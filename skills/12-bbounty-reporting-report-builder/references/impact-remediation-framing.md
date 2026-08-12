# Impact And Remediation Framing

## Purpose And Preconditions

Use when documenting bounded consequences and remediation considerations. Require a claim/evidence matrix that separates observed facts from inference.

## Documentation Methodology

Describe impact as the consequence demonstrably supported by the observed condition and state its assumptions, boundary, and limitations. Frame remediation as a security objective or control gap to investigate, not as a mandatory implementation prescription. For example, identify the authorization, validation, isolation, or monitoring property that should hold, then leave implementation selection to the owner.

## False-Claim And Privacy Controls

Do not assign severity, estimate payout, promise a fix, or assert broad exploitation paths. Do not claim a remediation removes all risk without verification. Avoid disclosing unnecessary architecture or defensive details that would expand exposure.

## Evidence And Handoff

Tie each impact statement to evidence and label assumptions. Hand off remediation framing with the affected boundary, desired security property, and open questions so engineering and triage can assess feasibility.

## Disclosure Sources

- [OWASP Vulnerability Management Guide](https://owasp.org/www-project-vulnerability-management-guide/)
- [NIST SP 800-40 Rev. 4, Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final)
