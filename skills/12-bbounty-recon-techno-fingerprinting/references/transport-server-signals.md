# Transport and Server Signals

## Purpose

Interpret exposed transport and server-layer metadata conservatively. These observations describe a delivery path, not necessarily the origin server or an installed version.

## Preconditions

- The target and ordinary response observation are explicitly in scope.
- Collection stays within the program's request, path, rate, and retention limits.

## Method

Use only public documentation, passive records, or an ordinary response obtained through a permitted normal visit. Record response status, protocol-level metadata, redirect context, and the collection time. Do not alter headers, paths, methods, TLS parameters, or malformed inputs to elicit a distinguishing response unless that exact action is separately authorized.

## Interpretation

- Treat disclosed protocol and server metadata as an observation of the responding layer.
- Treat a redirect as evidence of routing policy, not proof of the destination's complete stack.
- Treat absent or generic metadata as unknown, not concealment or a security conclusion.

## False-Positive Controls

- Intermediaries can add, remove, normalize, or cache metadata.
- Managed platforms and reverse proxies can make multiple origins appear identical.
- Do not infer a product version from a product family label or from a single stale public record.

## Scope and Rate Limits

One normal, in-scope retrieval is sufficient unless the program explicitly permits more. Stop on authentication prompts, access errors, rate-limit signals, unexpected sensitive data, or any ambiguity about the allowed method.

## Evidence

Preserve the target, timestamp, permitted request context, relevant metadata, redirect chain if normally followed, and redaction decision. State the delivery-layer limitation beside the claim.

## Sources

- https://www.rfc-editor.org/rfc/rfc9110
- https://www.rfc-editor.org/rfc/rfc9114
