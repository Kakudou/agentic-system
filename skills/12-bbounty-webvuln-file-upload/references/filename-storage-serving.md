# Filename, Storage, and Serving Behavior

## Purpose and Preconditions

Use after a permitted inert sample is accepted. Confirm that retrieving the resulting object through its intended path is authorized and within scope.

## Safe Workflow

Compare the presented filename with returned metadata and the filename exposed during download. Observe whether the service assigns a server-side identifier, separates tenant or owner namespaces, requires authorization at retrieval, and uses an appropriate `Content-Type` and `Content-Disposition`. Do not alter paths, enumerate identifiers, or retrieve another user's object.

## Interpretation and False Positives

A download URL may be intentionally shareable, temporary, or fronted by a CDN. A `Content-Type` header alone does not establish browser execution, and an attachment disposition can materially reduce exposure. Confirm the configured sharing model, expiry, and identity checks before reporting access control or serving risk.

## Evidence

Capture the authorized object reference, ownership context, retrieval result, relevant response headers, expiry or deletion behavior, and proof that the object tested belongs to the designated account.

## Remediation

Generate opaque server-side names, store uploads outside executable application paths, authorize every retrieval, use time-limited sharing links where appropriate, set `Content-Disposition: attachment` for untrusted downloads, and return a conservative content type with `X-Content-Type-Options: nosniff`.

## Sources

- [PortSwigger Web Security Academy: File upload vulnerabilities](https://portswigger.net/web-security/file-upload)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
