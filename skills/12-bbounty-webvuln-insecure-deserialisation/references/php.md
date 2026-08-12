# PHP Boundary Review

## Purpose And Preconditions

Use for an authorized PHP application when existing evidence indicates serialized state is accepted from a non-trusted boundary. Review only approved source, framework configuration, logs, or owner-supplied behavior.

## Inert Bounded Methodology

Record the input location, the parsing API or framework layer, validation before parsing, and whether accepted classes are explicitly constrained. Identify whether the input is an application-owned protected value or an externally controlled value.

## Observations And Interpretation

Deserializing externally controlled state into application objects needs owner review, particularly when class acceptance is broad. Encoding, JSON parsing into arrays, and a value stored only on the server are not equivalent to object deserialization.

## False-Positive Controls

Verify that the observed string reaches a parser and is not merely echoed, logged, encrypted, or treated as an opaque token. Do not infer reachability from dependency names or generic error pages.

## Evidence And Remediation

Provide redacted locators for input, parser configuration, and validation controls. Prefer data-only formats, strict schemas, explicit allowed classes only when legacy compatibility demands them, and migration away from unsafe trust-boundary parsing.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
