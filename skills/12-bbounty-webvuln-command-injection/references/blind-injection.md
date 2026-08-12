# Blind Injection Assessment

## Purpose and Preconditions

Use only after an input has a credible command-sink hypothesis but no safe inline observation exists. Obtain explicit approval for timing or callback testing, set a small request budget and delay ceiling, and identify a stop contact. Never use file writes, output redirection, or data extraction to establish blind injection.

## Safe Differential Method

For timing, interleave ordinary controls and one minimal delayed-condition comparison. Measure enough alternating samples to characterize normal variance, use a conservative threshold, and repeat only a stable result from a fresh session. Keep the induced delay short and stop immediately if latency, errors, or availability degrade.

For an external interaction, use a unique, controlled callback identifier that contains no target-derived data. Send the smallest authorized comparison once or twice, allow for asynchronous processing, and correlate only with the request timestamp and identifier.

## Interpretation and Controls

Queueing, cache misses, autoscaling, network jitter, rate limiting, background work, and WAF inspection can cause delay. DNS resolvers, link scanners, monitoring, retries, and unrelated traffic can create callbacks. A finding requires a reproducible controlled difference or callback correlation and documented exclusion of these alternatives.

## Evidence and Limits

Record redacted request metadata, sample timings, baseline distribution, callback identifier, timestamps, resolver/source metadata where available, and the termination point. Do not collect response-derived or target-derived data through a callback. Stop after minimum proof, any unexpected interaction, or a scope/availability concern.

## Remediation Direction

Eliminate shell construction, pass fixed arguments without a shell, apply strict allowlists for bounded choices, and restrict outbound network egress from application workers as defense in depth.

## Sources

- PortSwigger blind OS command injection: <https://portswigger.net/web-security/os-command-injection#blind-os-command-injection-vulnerabilities>
- PortSwigger OAST: <https://portswigger.net/burp/documentation/desktop/tools/collaborator>
