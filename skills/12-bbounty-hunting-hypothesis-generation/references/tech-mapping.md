# Technology And Behavior Observations

## Purpose

Use supplied technology and behavior evidence to identify security properties worth examining. A framework, service, version string, or architecture clue is a lead only; it does not establish exposure, reachability, or impact.

## Preconditions

- The asset is explicitly in scope and authorized.
- Observations identify their source, collection time, and affected asset.
- No new discovery, fingerprinting, or interaction is performed by this skill.

## Evidence-Led Method

1. Preserve the observation exactly enough to trace it to its source.
2. Classify it as technology, interface, data-flow, identity/role, state, or configuration behavior.
3. State the security property it may bear on, such as authorization consistency, input handling, isolation, or cache separation.
4. Pair it with a behavior observation before proposing a concrete hypothesis; otherwise record it as context with low confidence.

## Interpretation And Uncertainty

Version and framework fingerprints can be incomplete, stale, misleading, or supplied by an intermediary. Shared components and defaults do not reveal an application's custom controls. Absence of a visible control does not prove it is absent server-side.

## False-Positive And Bias Controls

- Do not map a technology directly to a vulnerability class.
- Seek a distinct, behavior-relevant observation before raising confidence.
- Record at least one benign explanation, such as a proxy, feature flag, test artifact, or non-production metadata.
- Treat unverified version information as low-confidence context.

## Scope And Privacy Limits

Do not collect additional fingerprints, inspect private code, access accounts, or retain sensitive values unless expressly authorized. Keep only the minimum observation needed for the handoff.

## Evidence And Handoff

Hand off the source reference, asset, observation class, security property, confidence, uncertainty, and the next question to resolve. Use the worksheet rather than a technology-to-weakness catalog.

## Sources

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy: Information gathering](https://portswigger.net/web-security/information-gathering)
