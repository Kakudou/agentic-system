# CIA and Authorization Dimensions

## Purpose and Preconditions

Use to classify an already evidenced effect. The asset and action must be within program authorization.

## Documentation Method

Document one dimension per claim. Confidentiality covers demonstrated unauthorized disclosure; integrity covers demonstrated unauthorized alteration or acceptance of altered state; availability covers demonstrated authorized evidence of impaired access; authorization-boundary impact covers a demonstrated bypass of the intended actor, role, tenant, or resource boundary. Cite the exact evidence and boundary definition.

## Interpretation

Classify only the demonstrated dimension. A boundary bypass does not establish data disclosure, state alteration, persistence, cross-tenant reach, or availability impact unless separately evidenced. A failed control alone may support an authorization claim but not a broader consequence.

## False-Claim and Privacy Controls

Use controlled or minimally invasive observations. Do not access other parties' data, alter production state, or induce load merely to populate a dimension. Record unavailable dimensions as not assessed.

## Evidence and Handoff

Transfer each dimension with its evidence locator, confidence, scope, and limitation in the [claim confidence matrix](../assets/dimension-claim-confidence-matrix.md).

## Sources

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [CVSS v4.0 specification](https://www.first.org/cvss/v4-0/specification-document)
