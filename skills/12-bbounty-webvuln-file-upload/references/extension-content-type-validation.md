# Extension and Content-Type Validation

## Purpose and Preconditions

Use when an upload feature declares allowed names, extensions, media types, or content validation. Confirm which inert formats the program permits. This reference does not authorize bypass attempts or active content.

## Safe Workflow

Establish a normal accepted sample, then make one approved comparison at a time, such as a permitted filename normalization case or a benign file whose declared media type differs from its known format. Observe the server's acceptance decision, normalized name, recorded media type, and later delivery headers. Stop if a comparison exceeds the agreed file classes or produces unexpected publication.

## Interpretation and False Positives

Different client and server media-type labels may be expected when the service detects content independently. Rejection can occur in an upstream gateway, malware scanner, asynchronous processor, or application validator. An accepted file is not proof that dangerous content would be accepted or executed.

## Evidence

Record the benign sample's expected format, presented name, declared media type, server decision, returned metadata, and retrieval headers. Redact boundary values, credentials, and opaque storage tokens.

## Remediation

Use a positive allowlist of business-required formats; validate file signatures and parser results server-side; normalize server-generated names; and treat client-provided names and media types as untrusted metadata.

## Sources

- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
