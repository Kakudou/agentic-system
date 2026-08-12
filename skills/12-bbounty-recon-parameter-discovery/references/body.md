# Body Inputs

## Purpose

Classify form, multipart, and structured request-body fields already emitted by approved client actions.

## Preconditions

Observe only an in-scope, permitted action. Do not submit speculative, destructive, or state-changing actions merely to reveal fields.

## Method

Record the request media type, field names or paths, nesting, repeatability, and visible client constraints from an existing capture. Treat file metadata and uploaded content as sensitive; retain only a redacted shape when necessary.

## Interpretation And Controls

Rendered form controls may be disabled, conditional, or never transmitted. A field in one request body does not establish support for another endpoint or content type. Keep JSON paths distinct from form field names.

## Evidence And Handoff

Link the capture to the action that generated it, classify it with [input location and type classification](input-classification.md), and place unconfirmed fields in the handoff's candidate section.

## Sources

- RFC 9110, HTTP semantics and content: https://www.rfc-editor.org/rfc/rfc9110
- HTML Standard, form submission: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#constructing-form-data-set
