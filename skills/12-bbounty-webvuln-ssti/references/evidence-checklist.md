# Evidence Checklist

## Purpose and Preconditions

Produce a reproducible, privacy-preserving report package after the bounded workflow. Require authorization details and redaction capability.

## Inert and Bounded Methodology

Use the [evidence and stop checklist](../assets/evidence-stop-checklist.md) to assemble only baseline, control, and inert-confirmation evidence. Identify each capture by time and request role. Redact credentials, tokens, cookies, personal data, and internal identifiers.

## Observations and Interpretation

A strong report shows the input path, a controlled difference, repeatability, and why ordinary reflection or transformation is unlikely. It separates observed behavior from untested potential impact.

## False-Positive Controls

Have a second reviewer verify redaction, control matching, response comparison, and scope. Mark unresolved alternatives as inconclusive.

## Stop Conditions

Stop collection after required proof is captured or whenever sensitive output, unstable service behavior, or a policy boundary is encountered.

## Evidence

Include authorization, redacted requests/responses, comparison notes, rendering context, confidence, impact boundary, and remediation. Exclude exploit steps and sensitive content.

## Remediation

Link the report to [prevention](prevention.md) and specify regression acceptance criteria.

## Sources

- PortSwigger, [Server-side template injection](https://portswigger.net/web-security/server-side-template-injection)
