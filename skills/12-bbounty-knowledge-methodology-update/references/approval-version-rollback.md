# Approval, Versioning, And Rollback Record

## Purpose

Maintain a clear distinction between a proposed change, an owner-approved change, and a superseded version, with a documented reversal path.

## Preconditions

- A complete proposal packet and compatibility/safety review.
- A designated approver with authority over the target methodology.
- A known controlled location for the methodology’s version history.

## Documentation Methodology

1. Record the proposal ID, target document, current version, and exact decision requested.
2. Record the approver identity, decision, date, and decision rationale or conditions.
3. Assign a new version only after approval according to the owner’s established versioning convention.
4. Create a concise change summary that links every changed section to its proposal evidence.
5. Name the prior approved version or controlled restoration reference, rollback owner, and conditions that require rollback review.

## Uncertainty And Safety Controls

- A draft label, proposed version, or reviewer comment is not approval.
- Do not overwrite, delete, or silently relabel the prior approved record.
- If the versioning convention, approver, or restoration reference is unavailable, defer the change.
- Rollback is an owner decision; this record documents the path but does not execute it.

## Evidence And Handoff

Include the approval record, version identifier, change summary, rollback reference, and unresolved conditions in the [approved-change handoff](../assets/approved-change-handoff-template.md). Notify the named recipient that the packet is documentation for controlled adoption, not evidence of deployment.

## Authoritative Sources

- Owner’s approval decision and established versioning policy
- Controlled history of the target methodology
- Approved rollback or restoration record
