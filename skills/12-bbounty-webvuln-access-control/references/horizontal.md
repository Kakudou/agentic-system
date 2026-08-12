# Horizontal Authorization Analysis

## Purpose and Preconditions

Use when a same-role peer comparison needs analysis across representations of the same data, such as detail, list, search, attachment, or export. Use only designated peers and test records.

## Authorized Assessment Steps

1. Define the private data class and expected peer boundary.
2. Establish the owner's expected results for each in-scope representation.
3. Test the peer only against known test references or controlled queries.
4. Record coverage gaps where an alternate representation cannot be safely tested.

## Observation and Interpretation

A peer boundary failure can appear in a collection or export even when a detail route is protected. Confirm that returned data belongs to the peer's protected object before reporting.

## False-Positive Controls

Exclude public records, intentional team shares, aggregate metrics, stale search indexes, and cached owner responses.

## Reporting Evidence

Use the [evidence template](../assets/evidence_template.md) with the representation, ownership, response comparison, and minimum protected result.

## Remediation

Apply consistent server-side relationship filters to all object representations, not only the primary detail route.

## Sources

- https://portswigger.net/web-security/access-control
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
