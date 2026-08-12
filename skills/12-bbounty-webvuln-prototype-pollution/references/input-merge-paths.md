# Input And Merge-Path Mapping

## Purpose

Map an authorized input from source through parsing and object composition to an observed consumer without introducing unsafe property names.

## Preconditions

- Structured input and a normal valid request are in scope.
- The tester can isolate normal test state and capture redacted evidence.

## Bounded Inert Methodology

Use distinct inert labels in documented ordinary fields. Trace acceptance, validation, normalization, nested copying, merge boundaries, storage, and display through authorized observation or source review. Record only components and behavior actually observed in the [worksheet](../assets/source-merge-sink-worksheet.md).

## Observation And Interpretation

Parsing plus recursive composition is a candidate path. It becomes relevant only if an application-controlled consumer demonstrably uses a property outside the intended own-property contract. Keep inferred edges marked as unverified.

## False-Positive Controls

Compare the normal request, verify labels are not framework-generated defaults, and distinguish a response echo from a downstream consumer.

## Stop Conditions

Stop if tracing would require special property names, internal endpoints, privileged logs, shared-state changes, or non-authorized instrumentation.

## Evidence

Capture source field, route, parser/merge component evidence, consumer, baseline comparison, and confidence for every edge.

## Remediation

Validate schemas before composition, use explicit allowlists and safe key handling, and avoid recursive merging of untrusted object graphs.

## Sources

- https://portswigger.net/web-security/prototype-pollution
- https://owasp.org/www-community/attacks/Prototype_Pollution
