# Runtime And Framework Boundary Interpretation

## Purpose And Preconditions

Use after format mapping to interpret evidence from an authorized architecture or source review.

## Inert Bounded Methodology

Trace only the documented stages: transport decode, parser, schema validation, type selection, binding, and business use. Classify each stage as confirmed, likely, or unknown. Stop before any active confirmation.

## Observations And Interpretation

Data-only parsing into fixed fields is distinct from allowing input to select runtime types. Validation after binding is weaker than validation before binding. A boundary may remain low confidence when deployment configuration is unavailable.

## False-Positive Controls

Do not confuse framework defaults with effective settings, or source references with reachable routes. Require owner confirmation for deployment-specific conclusions.

## Evidence And Remediation

Capture stage locators and configuration ownership. Recommend fixed schemas, explicit types, and validation before binding.

Source: [PortSwigger: Insecure deserialization](https://portswigger.net/web-security/deserialization)
