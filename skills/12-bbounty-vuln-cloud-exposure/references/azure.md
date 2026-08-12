# Ownership And Attribution

## Purpose

Determine whether a publicly observable cloud surface can reasonably be attributed to the authorized target before treating it as an exposure finding.

## Preconditions

- Authorization identifies the organization and permitted asset classes.
- The observation is limited to public information or an approved owner-provided view.

## Method

1. Collect independent, non-invasive attribution signals: a scoped domain inventory, documented vendor relationship, certificate naming, DNS delegation, official application links, or owner confirmation.
2. Record the provider and service indication separately from target ownership evidence.
3. Mark attribution as confirmed, supported, or unresolved. Escalate unresolved assets rather than probing them.

## Interpretation And Scope Controls

- Shared IP space, CDN addresses, generic cloud hostnames, and provider branding do not establish ownership.
- A branded subdomain can still be operated by a vendor or customer outside the authorization boundary.
- Expired DNS, abandoned names, and stale search results require owner confirmation; do not attempt registration, takeover, or service interaction.

## Privacy Limits

Collect only identifiers necessary for attribution. Do not collect account IDs, tenant details, employee data, internal hostnames, or customer names unless they are already public and needed for the report. Redact them in the handoff when not essential.

## Evidence And Handoff

Record each signal with source, timestamp, and limitation in `assets/cloud-asset-ownership-worksheet.md`. If ownership remains unresolved, hand off an attribution question, not a vulnerability claim.

## Sources

- [Azure shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility)
- [Azure architecture security guidance](https://learn.microsoft.com/en-us/azure/well-architected/security/)
- [OWASP WSTG Information Gathering](https://owasp.org/www-project-web-security-testing-guide/)
