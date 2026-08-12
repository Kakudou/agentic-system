# Client Artifact and Deployment Exposure

## Purpose and Preconditions

Review artifacts and deployment references intentionally delivered or directly linked by an authorized application. Do not guess artifact names, enumerate storage, or access unlinked resources.

## Bounded Marker-Based Methodology

Inspect only assets referenced by an already permitted page or response. Record markers such as artifact type, public linkage, embedded source-reference indicator, environment label, or deployment banner. Read only the portion necessary to determine whether exposed content exceeds its delivery purpose.

## Observations and Interpretation

An artifact can be a finding when it makes private source, configuration, internal service naming, or user data available beyond the client need. Public static content, expected license notices, and non-sensitive build identifiers alone are usually informational.

## False-Positive Controls

- Confirm the artifact is actually delivered by the in-scope application.
- Confirm that the observed content is not intentionally open source or public documentation.
- Distinguish a source-reference marker from proof that private content is exposed.

## Sensitive-Data Stop Conditions

Stop if an artifact reveals a credential, token, personal data, private source, proprietary configuration, or a route to non-public data. Do not download archives, extract files, or follow embedded internal references.

## Evidence and Redaction

Use the linked page context, artifact media type, marker location, and a redacted structural excerpt. Do not attach full artifacts unless the program expressly requires it and permits secure handling.

## Remediation

Exclude non-production artifacts from deploy outputs, remove embedded sensitive configuration, use environment-appropriate build settings, and enforce release checks that inspect published assets. Validate only the original linked artifact.

## Sources

- PortSwigger: https://portswigger.net/web-security/information-disclosure
- OWASP Secure Headers: https://owasp.org/www-project-secure-headers/
