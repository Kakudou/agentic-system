# Inline Injection Assessment

## Purpose and Preconditions

Use when a permitted input may reach a server-side utility and the HTTP response shows a stable, input-dependent difference. Confirm written authorization, a known-safe input, a request budget, and a redacted capture method first. This is not authorization to run system commands or retrieve system data.

## Safe Differential Method

1. Capture several ordinary baselines and record response status, length/shape, stable text, error class, and latency.
2. Send a unique inert marker to establish reflection and normalization behavior.
3. Compare paired, minimal syntax-boundary variations one at a time. A useful probe tests parsing behavior, not command capability.
4. Repeat a positive-looking comparison from a clean session and against a nearby control input. Stop once the parser boundary is supported.

## Interpretation and Controls

Returned text can originate from application validation, shell error handling, templating, a WAF, cache, or an upstream service. Treat command-like error wording as a hypothesis until repeated paired controls isolate it. Reflection alone, an HTTP 500, a blocked request, or one changed response is not proof of command execution.

## Evidence and Limits

Retain redacted baseline/comparison metadata, exact observation times, the input class rather than a reusable payload, and why alternatives were excluded. Do not request identity, configuration, environment, filesystem, network, or process information. Stop on unstable responses, unexpected content, rate-limit signals, or any indication of state change.

## Remediation Direction

Remove shell invocation where possible; call a fixed platform API or executable with a fixed argument vector. Where a bounded choice is necessary, map it to an allowlist and reject all other values. Avoid relying on escaping or denylisting shell metacharacters.

## Sources

- PortSwigger: <https://portswigger.net/web-security/os-command-injection>
- PortSwigger prevention: <https://portswigger.net/web-security/os-command-injection#how-to-prevent-os-command-injection-vulnerabilities>
