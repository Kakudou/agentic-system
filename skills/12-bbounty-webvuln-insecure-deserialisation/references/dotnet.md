# .NET Boundary Review

## Purpose And Preconditions

Use for an authorized .NET target with evidence of a formatter, serializer, or polymorphic model binder receiving untrusted state. Work from approved source, configuration, logs, or owner-provided observations only.

## Inert Bounded Methodology

Identify the serializer and its configuration, then record the trust source, validation order, and whether runtime type selection is enabled. Identify only the documented handler and model boundary; do not replay requests or create inputs.

## Observations And Interpretation

Legacy formatter use or unrestricted type metadata at an untrusted boundary merits owner review. A serializer being installed, or a model containing object-like fields, is not proof that hostile input can select a runtime type.

## False-Positive Controls

Separate internal queues protected by authenticated producers from public input. Confirm effective production configuration rather than relying on defaults, obsolete code, or exception strings.

## Evidence And Remediation

Preserve redacted references to configuration, binding path, and validation. Prefer data-only contracts, supported serializers, explicit type allowlists where polymorphism is unavoidable, and validation before model binding.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
