# Prevention

## Purpose

Provide boundary-specific prevention guidance and safe regression criteria.

## Preconditions

- The affected input or code boundary is identified, or the guidance is clearly marked preventive.
- Teams can validate changes in a controlled development or test environment.

## Bounded Inert Methodology

Review object construction and composition practices without reproducing unsafe inputs. Prefer schemas that reject unknown keys, allowlisted assignment, own-property checks, safe map-like or null-prototype structures where suitable, and maintained dependencies. Confirm normal fields still work and disallowed ordinary fields are rejected according to contract.

## Observation And Interpretation

A fix is effective when untrusted data cannot create ambiguous properties at the composition boundary and downstream consumers rely on explicit own values. Client and server controls should each be verified in their own runtime.

## False-Positive Controls

Ensure validation occurs before every recursive merge or transformation, not just at the perimeter. Confirm compatibility tests cover nested normal objects and versioned APIs.

## Stop Conditions

Stop and involve maintainers if the proposed change alters authorization, shared configuration, data migration, or production availability.

## Evidence

Document changed boundary, dependency version where relevant, ordinary regression cases, rejected-field behavior, code review, and deployment scope.

## Remediation

1. Define strict input schemas and reject unknown or unsafe keys.
2. Replace broad recursive composition of untrusted objects with explicit allowlisted mapping.
3. Require own-property access for security-sensitive decisions.
4. Update vulnerable dependencies and keep an inventory of object-composition utilities.

## Sources

- https://portswigger.net/web-security/prototype-pollution/preventing
- https://owasp.org/www-community/attacks/Prototype_Pollution
