# Gadget-Chain Risk Boundaries

## Purpose And Preconditions

Use this reference to explain risk boundaries to an owner after an authorized review identifies potentially unsafe object activation. It is not a discovery or testing guide.

## Inert Bounded Methodology

Record only whether the application permits untrusted input to select runtime types and whether a documented restriction exists. Ask the owner to perform a controlled dependency and call-path review; do not enumerate libraries, construct object graphs, or trace callable paths.

## Observations And Interpretation

Reusable components can expand risk only when an untrusted deserialization path can reach them under the deployed configuration. Dependency presence is contextual evidence, not proof of impact. Keep impact at `owner_review_required` unless the owner supplies controlled evidence.

## False-Positive Controls

Do not equate a framework, dependency, class name, or error message with a reachable unsafe path. Do not make impact claims from version numbers alone.

## Evidence And Remediation

Capture the input-to-parser boundary, type policy, and owner-confirmed deployment context. Remediate the unsafe boundary itself: replace native object handling, remove dynamic type selection, and reduce unnecessary dependencies.

Source: [PortSwigger: Deserialization - gadget chains](https://portswigger.net/web-security/deserialization/exploiting)
