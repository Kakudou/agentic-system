# Execution Impact Boundary

## Purpose and Preconditions

This guide replaces execution-chain testing. It explains how to report potential severity without attempting code execution, command invocation, object traversal, file access, environment access, or capability discovery.

## Inert and Bounded Methodology

After confirmed inert interpretation, assess impact from trusted architecture evidence only: template engine documentation, code review supplied by the owner, or a separately authorized isolated test environment. State the deployment assumptions, sandboxing claims, and evidence source. Do not make live-target requests beyond the confirmation workflow.

## Observations and Interpretation

Report the observed condition as server-side template interpretation of untrusted input. Describe execution as a conditional risk only when supported by authoritative evidence, and distinguish it from demonstrated impact. Do not assign critical severity solely from an engine name.

## False-Positive Controls

Verify that the rendering path is server-side, the input reaches template source rather than a data placeholder, and the cited version/configuration applies to the affected deployment. Treat generic security advisories and public engine capabilities as non-proof.

## Stop Conditions

Stop if assessing impact would require live capability testing, credentials, sensitive data, new routes, or production configuration access not explicitly authorized.

## Evidence

Record the inert confirmation evidence, source URLs or owner-provided review references, applicability rationale, unmet assumptions, and an explicit statement that execution was not tested.

## Remediation

Remove dynamic template compilation, restrict template loaders and helper exposure, run rendering under least privilege, and add regression tests proving untrusted data is rendered literally. See [prevention](prevention.md).

## Sources

- PortSwigger, [Impact of SSTI](https://portswigger.net/web-security/server-side-template-injection#what-is-the-impact-of-server-side-template-injection)
- PortSwigger, [Preventing SSTI](https://portswigger.net/web-security/server-side-template-injection#how-to-prevent-server-side-template-injection)
