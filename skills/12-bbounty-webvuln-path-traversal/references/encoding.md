# Encoding

## Purpose And Preconditions

Use when a path value may be decoded or transcoded by multiple components. Work only with an authorized inert marker, a reproducible baseline, and a documented request capture method.

## Bounded Marker Workflow

1. Send the ordinary marker representation and retain its sanitized metadata.
2. Compare one alternate representation at a time, without combining transformations.
3. Use the worksheet to record client representation, observed handler behavior, and whether the marker remains the only accessible content.
4. Stop on unexpected content, ambiguous decoding, or rate-limit feedback.

## Normalization And Decoding Model

Percent decoding, character-set conversion, Unicode normalization, and application parsing are distinct stages. Defects occur when a filter evaluates one form while a later component resolves another. Correct handling defines an accepted character set and identifier grammar, performs controlled decoding once, rejects invalid or ambiguous input, and validates the final canonical path against the fixed base.

## Observations And Interpretation

- A changed response can identify differential decoding, routing, or filtering.
- The same marker response across representations is a useful comparison, not a bypass claim.
- Only marker-only behavior that violates the intended selection boundary is confirmation.

## False-Positive Controls

Verify the client did not normalize the value before transmission. Compare response headers and handler-specific markers, not status alone. Avoid conclusions based on reflected input, generic errors, or WAF messages.

## Evidence And Remediation

Record the exact sanitized representation, baseline comparison, response metadata, and stage hypothesis. Decode once at a defined boundary; reject malformed sequences and unexpected Unicode; avoid blacklist transformations.

## Source

- PortSwigger: <https://portswigger.net/web-security/file-path-traversal>
