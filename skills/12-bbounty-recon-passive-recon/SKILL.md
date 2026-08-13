---
name: 12-bbounty-recon-passive-recon
description: Produce authorized, evidence-bound passive reconnaissance observations without contacting target infrastructure or handling sensitive data beyond need.
metadata:
  version: "2.0"
  opencode/slash: "true"
---

# Authorized Passive Reconnaissance

## Purpose

Turn public, third-party observations into a bounded asset hypothesis set for an authorized security engagement. Passive reconnaissance does not request, probe, authenticate to, or otherwise interact with target-controlled infrastructure.

## Prerequisites

- Written authorization and current program rules.
- Exact in-scope identities and explicit exclusions.
- A defined reporting recipient and approved evidence-handling location.

## Workflow

1. Establish the permitted identities, ownership evidence, stop conditions, and data-minimization rules. Read [scope and identity controls](references/scope-identity.md).
2. Review publicly logged certificate metadata only when domain names are in scope. Read [certificate transparency review](references/certificate-transparency.md).
3. Review public repositories only when they have a documented organizational or project relationship to the target. Do not seek, retain, or validate credentials. Read [public code and repository review](references/public-repositories.md).
4. Record limited observations from public search indexes and third-party datasets. Do not use query catalogs, automated collection, or inspect target content. Read [search and public dataset observations](references/search-public-datasets.md).
5. Treat archived DNS and web observations as dated historical context, not current reachability or ownership. Read [historical DNS interpretation](references/historical-dns.md).
6. Correlate independent sources, label confidence and attribution separately, and hand off only evidence-supported hypotheses. Read [correlation and handoff](references/correlation-handoff.md).

Stop immediately on an unclear scope boundary, apparent personal data, credentials, access tokens, or any need to contact a target. Apply [the handling and stop checklist](assets/passive-data-handling-stop-checklist.md).

## Evidence

- Record source URL, access time, source publication/observation time where available, exact observed claim, and permitted target identity.
- Preserve the minimum necessary excerpt or immutable locator. Do not collect secrets, personal data, full source archives, or target content.
- Use the [source-to-claim worksheet](assets/source-to-claim-evidence-worksheet.md) and [attribution/confidence matrix](assets/attribution-confidence-matrix.md).

## Output

Deliver a dated, passive-only handoff using the [recon handoff template](assets/recon-handoff-template.md). Separate confirmed public facts from hypotheses, name attribution limitations, list exclusions and stop events, and identify any follow-up that requires separate authorization.

## Supplemental Index

- [Scope and identity controls](references/scope-identity.md)
- [Certificate transparency review](references/certificate-transparency.md)
- [Public code and repository review](references/public-repositories.md)
- [Search and public dataset observations](references/search-public-datasets.md)
- [Historical DNS interpretation](references/historical-dns.md)
- [Correlation and handoff](references/correlation-handoff.md)
- [Operational assets](assets/)
