# Evidence Admission

## Purpose

Determine whether supplied material can support a finding-validation decision without modifying the target or evidence.

## Preconditions

- Written authorization and asset scope are available.
- The finding claim identifies an asset and security property.
- Evidence can be referenced without unnecessary disclosure of sensitive data.

## Bounded Methodology

1. Inventory each item by source, collector or system, asset, collection context, time, and preservation reference.
2. Separate direct observations from summaries, tool classifications, screenshots, and analyst interpretations.
3. Admit evidence only when its relationship to the stated asset and claim is traceable; label missing context rather than filling it in.
4. Minimize sensitive content in the validation record and preserve original references unchanged.

## Observation Interpretation

Direct, contextualized observations can support a narrow claim. A screenshot, scanner label, or copied excerpt may corroborate a claim but does not independently establish behavior or impact. Missing time, asset, account, or request context limits what can be concluded.

## False-Positive, Bias, And Scope Controls

- Do not treat an unverified tool result as a confirmed vulnerability.
- Do not combine evidence from different assets, tenants, accounts, or time periods without recording the boundary.
- Do not collect more data merely to make a weak claim appear complete; escalate missing evidence to the authorized owner.

## Evidence And Handoff

Record admitted, excluded, and unavailable items with reasons. Pass only admitted evidence references and their limitations to the triage owner.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [NIST SP 800-61 Rev. 2, Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final)
