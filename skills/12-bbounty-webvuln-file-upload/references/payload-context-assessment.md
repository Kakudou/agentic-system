# Payload and Context Assessment

## Purpose and Preconditions

Use when an accepted upload might be stored or delivered in a security-sensitive context. This assessment is contextual and uses no executable, active, or dual-purpose payload.

## Assess

Determine from authorized observations and documentation whether uploaded objects are kept outside executable application paths, transformed into safe derivatives, access-controlled at retrieval, and delivered with conservative headers. Record the precise confirmed control gap rather than asserting code execution from file acceptance alone.

## Impact Boundaries

Do not claim execution, cross-user access, stored script execution, configuration modification, or server compromise without program-authorized, independently verifiable evidence. If confirmation would require an active payload, stop and request explicit authorization or report the validated lower-impact control failure.

## False-Positive Controls

Account for storage-service URL patterns, attachment downloads, browser sandboxing, content security policy, CDN behavior, authorization checks, and file transformation. Client-side preview behavior is not evidence of server-side execution.

## Evidence and Remediation

Capture the authorized serving context, retrieval headers, transformation state, access-control result, and impact rationale. Store untrusted uploads outside the web root, deny execution at the storage and serving layers, authorize access, and prefer generated derivatives over serving originals.

## Sources

- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
