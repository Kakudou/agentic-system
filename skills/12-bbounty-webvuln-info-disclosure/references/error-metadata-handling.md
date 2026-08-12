# Error and Metadata Handling

## Purpose and Preconditions

Assess error and metadata markers encountered during allowed interactions. Use only normal flows or explicitly program-approved validation cases; do not manufacture exceptional load or fault conditions.

## Bounded Marker-Based Methodology

Note visible error identifiers, stack-frame presence, internal service labels, correlation identifiers, build labels, and response metadata. Compare an expected success response with an error response from the same permitted workflow. Record categories and structure, not complete payloads.

## Observations and Interpretation

Detailed exception context, internal topology, file-system-like locations, or deployment identifiers may be material when they reveal non-public implementation details. A generic error code or opaque correlation ID is usually not a disclosure without additional exposed context.

## False-Positive Controls

- Verify that the marker originates from the target rather than a browser, proxy, or test tooling.
- Check whether the value is intentionally documented for support use.
- Do not infer exploitability from a component name alone.

## Sensitive-Data Stop Conditions

Stop at credentials, tokens, personal data, request bodies from other users, internal source fragments, or configuration values. Do not continue the failing workflow to obtain more detail.

## Evidence and Redaction

Report the permitted action, response class, field name or marker category, and redacted excerpt. Preserve correlation IDs only if program policy permits and they contain no sensitive material.

## Remediation

Use user-safe error messages, log detailed diagnostics only in protected telemetry, suppress unnecessary framework headers, and apply production error configuration. Validate with the same permitted invalid input or normal error path.

## Sources

- PortSwigger: https://portswigger.net/web-security/information-disclosure
- OWASP Error Handling: https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html
