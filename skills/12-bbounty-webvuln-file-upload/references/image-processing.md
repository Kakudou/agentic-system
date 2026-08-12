# Image Processing Assessment

## Purpose and Preconditions

Use when an upload pipeline resizes, converts, previews, strips metadata, or extracts image attributes. Confirm allowed image formats, maximum dimensions, processing limits, and a stop condition for failures.

## Safe Workflow

Upload a known-good inert image from the manifest and compare its server-produced derivative with the documented expectation. Record dimensions, output format, processing status, metadata handling, and delivery behavior. If authorized, use one bounded benign integrity case such as a truncated copy solely to observe rejection or error handling; do not use crafted multi-format or executable files.

## Interpretation and False Positives

Background workers, cache delay, orientation correction, compression, and metadata stripping can make outputs differ without indicating a weakness. Treat an error page or timeout as an operational observation, not a security finding, unless it creates a confirmed security-relevant effect.

## Evidence

Capture source and output sample IDs, documented expectation, processing timestamps or states, output metadata, and the cleanup result. Do not retain user images or sensitive embedded metadata in evidence.

## Remediation

Decode and re-encode supported images in an isolated processor, enforce dimensions and resource limits, strip unneeded metadata, quarantine failures, and serve derivatives from non-executable storage.

## Sources

- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
