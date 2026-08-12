# Version And Protocol Classification

## Purpose

Classify protocol and version only from declared or naturally observed signals so later work does not assume a contract.

## Preconditions

- A scoped documentation artifact or approved client observation is available.
- The observed host and service are already confirmed in scope.

## Methodology

Record explicit protocol labels, media types, client library behavior, service names, and version fields or headers exactly as exposed. Classify HTTP APIs, GraphQL, gRPC, or another protocol only when a source supports it. Record a version only when the source names it; otherwise mark it unconfirmed.

## Interpretation

A GraphQL library marker is not proof of an accessible GraphQL endpoint. A gRPC-related header is not a service inventory. A path token, header, or documentation label may be a product label rather than an API compatibility version. Use the matrix to retain the signal and competing explanations.

## False-Positive And Scope Controls

- Do not derive paths from version labels or try alternative protocol transports.
- Do not send protocol-specific probes, reflection requests, schema queries, or method variations.
- Do not infer production equivalence from a client bundle, staging reference, or cached artifact.

## Evidence

Capture the exact source, signal, timestamp, environment context, classification, confidence, and alternate interpretation.

## Handoff

Supply a protocol/version confidence statement and identify the precise evidence needed to resolve an unconfirmed classification.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
