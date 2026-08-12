# .NET Validation Notes

## Purpose And Preconditions

Use as a concise validation companion for an authorized .NET boundary review with owner-approved evidence.

## Inert Bounded Methodology

Identify the configured serializer, trust source, validation order, and any runtime type-selection policy from source or configuration.

## Observations And Interpretation

Legacy formatter access or broad type selection is a boundary concern; it does not itself demonstrate an outcome.

## False-Positive Controls

Exclude inactive code, default settings overridden in deployment, and producer-authenticated internal messages.

## Evidence And Remediation

Record redacted configuration locators. Use data-only contracts, supported serializers, restricted polymorphism, and pre-binding validation.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
