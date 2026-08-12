# Impact Boundaries

## Purpose

Describe impact conservatively without escalating a property-handling observation into mutation, gadget analysis, execution, or data access.

## Preconditions

- The candidate path is mapped and observations are reproducible.
- Program rules for impact validation and disclosure are available.

## Bounded Inert Methodology

State the affected component, actor boundary, and observed consequence only. Identify what was not tested, including persistence, cross-user scope, privileged behavior, data access, and execution. Use architecture evidence or program-confirmed telemetry instead of active impact testing.

## Observation And Interpretation

An input-handling weakness may be reportable when a security-relevant effect is observed. Potential downstream consequences remain hypotheses unless independently and safely evidenced within explicit authorization. Do not assign severity from library presence alone.

## False-Positive Controls

Separate same-session UI effects from shared service behavior. Check whether the behavior is scoped to a disposable test record and whether the relevant consumer enforces its own validation.

## Stop Conditions

Stop if impact characterization requires reading data, crossing users or tenants, manipulating authorization or configuration, invoking commands, or causing resource consumption.

## Evidence

Record observed boundary, affected actor or component, confidence, excluded tests, and any program-provided corroboration.

## Remediation

Prioritize the earliest untrusted composition boundary, then protect downstream consumers with explicit defaults, own-property checks, and schema validation.

## Sources

- https://portswigger.net/web-security/prototype-pollution
- https://owasp.org/www-community/attacks/Prototype_Pollution
