# Evidence Admission and Chain of Custody

## Purpose

Ensure each accepted artifact can be tied to an authorized observation without overstating its origin, timing, or completeness.

## Preconditions

- Written scope, observation window, and approved evidence store are available.
- The artifact already exists from authorized work; admission will not trigger collection.

## Documentation Method

Assign a stable artifact ID. Record its class, source application or page, observer/session context, observed time or bounded time window, scope decision, original or derivative status, and any available immutable-content identifier. Add a custody entry whenever custody, storage location, access classification, or redaction status changes. Use the [static evidence manifest](../assets/evidence-manifest.md).

## Privacy and False-Claim Controls

Provenance records identify what was observed, not who caused it, whether it is exploitable, or whether it represents the full exchange. Do not infer a timestamp, actor, or missing request component. Keep sensitive originals restricted and expose only authorized derivatives or metadata.

## Evidence and Handoff

Handoff includes the manifest, custody sequence, scope decision, and any provenance gaps. Mark gaps `unavailable` or `inconclusive`; do not repair them by recollection or later reconstruction.

## Sources

- [NIST SP 800-86: Guide to Integrating Forensic Techniques](https://csrc.nist.gov/pubs/sp/800/86/final)
- [OWASP Vulnerability Disclosure Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Vulnerability_Disclosure_Cheat_Sheet.html)
