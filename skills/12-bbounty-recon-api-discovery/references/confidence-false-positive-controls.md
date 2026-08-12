# Confidence And False-Positive Controls

## Purpose

Prevent unsupported endpoint, protocol, version, and contract claims from becoming reconnaissance findings.

## Preconditions

- Each claim has a retained source reference and scope decision.
- A second independent approved source is available when corroboration is needed.

## Methodology

Label a claim `direct` when a supplied contract or naturally observed request explicitly supports it, `corroborated` when two independent approved sources agree, and `inconclusive` when evidence conflicts or lacks key context. Compare source date, environment, identity, and operation before treating two records as independent.

## Interpretation

Confidence reflects support for an observation, not security impact, exploitability, ownership, or completeness. A successful normal response confirms only that observed request in its observed context.

## False-Positive And Scope Controls

- Keep documentation claims, client observations, and analyst hypotheses separate.
- Treat generated clients, cached assets, framework strings, response banners, and third-party calls as ambiguous until supported by a scoped source.
- Do not seek corroboration by adding requests outside the approved ordinary flow; stop and request approval instead.

## Evidence

Record claim text, sources, timestamps, environment/identity context, confidence, competing explanations, and unresolved gaps.

## Handoff

Hand off only the evidence-supported claim and its confidence. State the least additional authorized observation that could resolve ambiguity.

## Sources

- PortSwigger Web Security Academy, [API testing](https://portswigger.net/web-security/api-testing)
- OWASP, [API Security Project](https://owasp.org/API-Security/)
