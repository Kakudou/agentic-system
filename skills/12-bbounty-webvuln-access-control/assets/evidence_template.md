# Access-Control Evidence Template

## Purpose and Preconditions

Use for every candidate and confirmed finding. Gather evidence only from authorized testing and redact session secrets, credentials, and unnecessary personal data.

```yaml
case_id: string
scope_reference: string
policy_tuple:
  subject: designated account and role
  tenant: designated test tenant or not_applicable
  object: test object and ownership relationship
  action: exact endpoint, method, resolver, or workflow step
  expected: allow | deny
baseline:
  request_reference: redacted capture
  response_summary: status and minimum relevant fields
comparison:
  request_reference: redacted capture
  response_summary: status and minimum relevant fields
observation: protected data disclosed | protected action completed | no mismatch
false_positive_checks: [delegation checked, cache controlled, test data confirmed]
state_change:
  before: string
  after: string
  cleanup: not_applicable | restored | pending
impact: string
```

## Interpretation

Attach evidence that lets an independent reviewer verify the subject/object/action mismatch without replaying broad enumeration or destructive operations. If the policy is uncertain, report it as a validation gap rather than a confirmed vulnerability.

## Sources

- https://portswigger.net/web-security/access-control
- https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/
