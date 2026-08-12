# Evidence-Led Impact Boundaries

## Purpose and Preconditions

Set a defensible impact statement from inert evidence. Require confirmed inert interpretation or a clearly labelled suspected condition.

## Inert and Bounded Methodology

Describe the affected route, trust boundary, affected user role, and whether untrusted input becomes template source. Consult owner-provided architecture or public product documentation only when it applies to the deployment. Use [execution impact boundary](rce-chains.md) for conditional-risk language.

## Observations and Interpretation

Confirmed parsing of untrusted input establishes a security defect. It does not itself prove access to data, remote execution, tenant crossover, or availability loss. State potential consequences as assumptions, not findings.

## False-Positive Controls

Do not infer severity from a framework name, response error, or a generic CVE. Verify applicability, reachability, and privilege boundaries separately.

## Stop Conditions

Stop if evidence gathering would require sensitive data, credentials beyond the test account, or live capability testing.

## Evidence

Include only inert confirmation, deployment facts with provenance, scope of affected input, and the distinction between observed and potential impact.

## Remediation

Prioritize removal of dynamic template construction, then containment controls such as sandboxing and least privilege. See [remediation lookup](../assets/remediation-lookup.md).

## Sources

- PortSwigger, [Impact of SSTI](https://portswigger.net/web-security/server-side-template-injection#what-is-the-impact-of-server-side-template-injection)
