# Baseline Governance And Evidence Admission

## Purpose

Determine whether supplied baseline and comparison material can support a bounded change analysis.

## Preconditions

- Written authorization and a declared comparison scope.
- Supplied evidence identifies its source, observation time, collection boundary, and handling status.

## Evidence-Led Method

Create one record per evidence set. Preserve its original identifier, timestamps, declared target or service boundary, observation method as supplied, and redaction state. Admit a pair only when both records concern the same approved comparison scope and their collection contexts are sufficiently described to evaluate differences. Mark missing metadata as a limitation; do not reconstruct it.

## Interpretation And Attribution Controls

A newer record is not automatically a valid baseline successor. A difference may arise from collection coverage, observer perspective, formatting, redirects, tenancy, deployment timing, or incomplete evidence. Treat a baseline as a point-in-time observation, not a complete inventory or ownership proof.

## Privacy And Scope Limits

Retain only evidence permitted by program rules. Do not expose credentials, tokens, personal data, full response bodies, internal identifiers, or third-party material. Stop and route uncertainty if the evidence crosses an unapproved host, tenant, account, or ownership boundary.

## Evidence And Handoff

Record admitted, excluded, and incomplete evidence separately, with the reason and source reference. Handoff unresolved provenance or scope questions to the program-designated owner.

## Sources

- [NIST SP 800-53 Rev. 5, CM-8: System Component Inventory](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
