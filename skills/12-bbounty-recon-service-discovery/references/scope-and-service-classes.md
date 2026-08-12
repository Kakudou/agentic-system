# Scope and Permitted Service Classes

## Purpose and Preconditions

Translate a program's written authorization into a bounded observation task. Work only from the current policy, explicit asset list, permitted service classes, and published restrictions.

## Authorized Bounded Method

Record the policy reference, effective date, allowed asset identifiers, allowed observation sources, service classes explicitly permitted for documentation, and the stop/escalation contact. Resolve ambiguity in favor of exclusion. This step does not authorize active discovery, authentication, or interaction.

## Interpretation

In-scope ownership does not automatically authorize every host, protocol, or data type associated with an asset. A wildcard, CIDR, vendor, or platform mention must be interpreted exactly as the program states. If a service class is not explicitly permitted, label it unassessed.

## False-Positive Controls

- Use the latest program policy, not a copied summary.
- Separate verified assets from lookalikes, customer tenants, and vendor-managed infrastructure.
- Do not infer scope from naming patterns, certificates, or public search results.

## Rate and Scope Limits

Passive review remains limited to the stated asset and source set. Stop immediately on a scope conflict, missing authorization, sensitive-data exposure, or request to perform active validation.

## Evidence and Handoff

Preserve the policy URL or identifier, retrieval time, relevant clause, scope decision, and any ambiguity. Escalate unresolved scope questions to the program owner before further work.

## Sources

- [Bugcrowd Vulnerability Rating Taxonomy and Program Guidance](https://docs.bugcrowd.com/)
- [HackerOne Program Policy Guidance](https://docs.hackerone.com/)
