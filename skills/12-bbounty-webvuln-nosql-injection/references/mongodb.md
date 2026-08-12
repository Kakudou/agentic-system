# Database-Specific Considerations

## Purpose and Preconditions

Use this reference when technology evidence suggests a document-store adapter or MongoDB-compatible query model. Do not treat product names in headers, errors, libraries, or guesses as confirmation. Require authorization and use only the parent workflow's bounded assessments.

## Safe Bounded Assessment

1. Identify the application's published request schema and queryable fields.
2. Determine whether the server uses a document mapper, repository abstraction, or direct query API from authorized source review or maintainer information.
3. Verify that scalar request values remain scalar through the request schema and mapper boundary.
4. Verify that any documented filter, sort, or projection input is translated through server-owned field and option allowlists.
5. Test only the original low-impact differential against a test record; do not send query expressions, patterns, scripts, pipelines, or broad selectors.

## Observation and Interpretation

Flexible document schemas do not require flexible public API schemas. A database adapter may legitimately accept query documents internally while the application must never pass a request body, nested request field, or client-provided option map directly to it. Evidence should connect the external field to that unsafe handoff.

## False-Positive Controls

Separate document mapper type conversion, missing-field defaults, optional field handling, query middleware, tenant filters, and search-index behavior from user-controlled query structure. Version-specific features and driver behavior must be verified from the deployed application's documentation or source.

## Evidence

Capture technology evidence confidence, API field contract, relevant sanitized query-builder or mapper boundary, baseline and differential outcome, and remediation location. Avoid database contents, connection details, and credentials.

## Remediation

Use DTO validation before mapper invocation, construct query documents in server code, allowlist field names and sort directions, disallow user-supplied operator-like keys recursively, and apply authorization constraints as fixed predicates. See [prevention and remediation](prevention.md).

## Further Reading

- PortSwigger: <https://portswigger.net/web-security/nosql-injection>
- MongoDB query selector injection defense: <https://www.mongodb.com/docs/manual/reference/operator/query/>
