# Minimum-Necessary Data Proof

Data retrieval is not the default next step after finding SQLi. Obtain written scope for the affected asset, data classes, account role, maximum records, storage location, and reporting requirements. Prefer proving reachability with a test record or non-sensitive metadata.

## Authorized proof workflow

1. State the impact question: for example, whether a low-privilege application identity can read a named in-scope table.
2. Confirm the injection technique and query channel using harmless constants.
3. Identify the exact minimum fields and record count required. Select fields that avoid authentication material, financial data, personal data, secrets, and regulated categories.
4. Retrieve one bounded result only if authorization permits. Do not use wildcards, aggregate all rows, or expand to adjacent tables.
5. Immediately redact values in notes and evidence. Store raw material only where the engagement rules explicitly permit, restrict access, and delete it under the agreed retention policy.

For blind techniques, avoid character-by-character recovery of any sensitive value. A stable oracle plus an authorized non-sensitive fact is usually enough to demonstrate severity.

## Evidence and reporting

Report the vulnerable endpoint and parameter, account context, technique, paired controls, database access boundary, and the smallest redacted output proving the claim. Separate confirmed facts from potential impact: catalog visibility does not prove data reads, and one table read does not prove administrative access. Include request IDs/timestamps without session cookies or access tokens.

## Stop conditions

Stop when the authorization boundary is unclear, a sensitive field appears unexpectedly, a response indicates state change, the service degrades, rate limiting begins, or the requested evidence has been obtained. Escalate to the program owner rather than attempting to bypass controls or continue extraction.

## Mitigations

Replace concatenated SQL with bound parameters, allowlist dynamic identifiers, use narrow database roles, segregate sensitive data, rotate exposed secrets under an incident process, and ensure production logs do not store raw request values. Validate the correction with the original harmless proof path.

## Sources

- https://portswigger.net/web-security/sql-injection
- https://portswigger.net/web-security/sql-injection/union-attacks
- https://portswigger.net/web-security/sql-injection/examining-the-database
