# Request, Response, Browser, and Terminal Artifact Classification

## Purpose

Label artifacts by how they were observed so reviewers do not treat a partial record, rendering, or local note as a complete protocol exchange.

## Preconditions

- The artifact was already obtained through authorized work.
- Scope and sensitivity status are known or marked unresolved.

## Documentation Method

Classify an artifact as a request record, response record, browser observation, terminal observation, or derivative. Record what it directly contains, its source context, relevant omissions, and its relationship to other artifacts. Use the [artifact and redaction classification matrix](../assets/artifact-redaction-classification-matrix.md).

## Privacy and False-Claim Controls

A request record does not prove the server received it. A response record does not prove which browser state produced it. A browser rendering does not prove the complete network exchange. Terminal output may omit environment, command context, or prior state. A redacted derivative is not byte-identical to its original. Do not merge classes into a single claimed fact without direct linking evidence.

## Evidence and Handoff

List each artifact's class, direct support, missing context, sensitivity class, and corroborating artifact IDs. Ask for authorization before seeking any missing artifact.

## Sources

- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
