# Ownership Modeling

## Purpose

Describe observed ownership relationships, delegation language, and parent-child object context without asserting enforcement behavior.

## Preconditions

- The observation is limited to in-scope documentation or the approved account's normal views.
- No object creation, reassignment, sharing, transfer, or permission change is required.

## Method

- Record direct language such as “created by,” “owned by,” “member of,” or “managed by.”
- Map the displayed relationship: person-to-object, organization-to-object, workspace-to-project, or parent-to-child.
- Mark whether the relationship is explicit, derived from a UI grouping, or unknown.

## Interpretation And Controls

- “Owner” may be a display field, billing contact, creator, or authorization principal; preserve the product's wording.
- Do not infer inheritance or delegated access from layout alone.
- Keep organization and user ownership distinct, and do not inspect another user's objects to fill gaps.

## Privacy Safeguards

Replace personal names and object titles with neutral labels. Avoid screenshots that expose unrelated records; crop or quote only the relevant label when permitted.

## Evidence And Handoff

Enter the relationship and supporting source in the confidence matrix. State unknown ownership rules explicitly and hand off only hypotheses that have a clear source.

## Sources

- [PortSwigger: Insecure direct object references](https://portswigger.net/web-security/access-control/idor)
- [OWASP API Security: Broken Object Level Authorization](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
