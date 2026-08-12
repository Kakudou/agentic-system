# Cloud Exposure Boundaries

## Purpose

Establish the authorization, scope, provider context, and ownership threshold required before making a cloud-exposure observation.

## Preconditions

- Written engagement or program authorization is available.
- The authorized organization, assets, time window, allowed methods, and reporting channel are identifiable.

## Method

1. Record the exact scope source and allowed observation boundary before visiting an asset.
2. Identify provider context from approved inventory, public documentation, or a non-invasive public signal. Treat it as context, not ownership.
3. Establish ownership through at least one authoritative signal and, where ambiguity remains, owner confirmation or program triage.
4. Stop for missing authorization, ambiguous scope, third-party ownership, or a method outside the stated allowance.

## Interpretation And Scope Controls

- Cloud provider infrastructure is shared. A provider service, IP range, or hostname alone is never sufficient ownership proof.
- Scope does not implicitly authorize neighboring tenants, vendor systems, account-level resources, internal services, or attempts to discover additional assets.
- Keep a separate finding for an observed exposure and an unresolved attribution question.

## Privacy Limits

Limit records to public identifiers and the minimum engagement references needed for triage. Do not collect tenant, subscription, project, account, or internal network information.

## Evidence And Handoff

Start `assets/cloud-asset-ownership-worksheet.md` before observation. If the ownership threshold is not met, hand off only the attribution ambiguity with its sources.

## Sources

- [AWS shared responsibility model](https://aws.amazon.com/compliance/shared-responsibility-model/)
- [Azure shared responsibility](https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility)
- [Google Cloud shared responsibility model](https://cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
