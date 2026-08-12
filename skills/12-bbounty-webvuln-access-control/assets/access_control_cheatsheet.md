# Access-Control Assessment Cheat Sheet

## Purpose and Preconditions

Use this compact checklist during an authorized assessment after reading the active reference. It is a triage and quality-control aid, not a request catalog or bypass guide. Use only designated accounts, test objects, and tenants.

## Assessment Checklist

| Check | Record | Do not conclude from |
|---|---|---|
| Policy | Subject, object, action, tenant, expected result | A guessed role hierarchy |
| Baseline | Normal request, response shape, and object ownership | A status code alone |
| Comparison | Controlled peer/role/tenant request and result | An identifier being predictable |
| Impact | Minimum protected field disclosed or safe action completion | A UI element being hidden |
| State | Before/after and cleanup confirmation | A request that was rejected or no-op |
| Coverage | Methods, nested routes, workflow steps, and collections checked | One protected endpoint representing all routes |

## False-Positive Controls

- Confirm the accounts and test objects are distinct and their relationship matches the proposed policy violation.
- Distinguish public, delegated, support, shared, and administrator-approved access from unauthorized access.
- Compare normalized response content, not only length, redirects, caching, or error wording.
- Confirm server-side effect with designated test data for any permitted write, then restore state.
- Redact secrets and personal data; retain only minimum proof required by the program.

## Evidence and Remediation

Capture each confirmed case with the [evidence template](evidence_template.md). Map fixes with the [remediation lookup](remediation_lookup.md). Read the active detailed reference before selecting a test.

## Sources

- https://portswigger.net/web-security/access-control
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
