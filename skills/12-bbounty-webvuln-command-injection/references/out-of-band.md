# Out-of-Band Observation

## Purpose and Preconditions

Use only for an authorized blind-injection hypothesis when inline evidence is unavailable and the program allows controlled external callbacks. The callback service, unique identifier, data handling, request count, and retention period must be approved before testing.

## Safe Method

Generate one opaque identifier per comparison. Observe only that identifier, protocol, timestamp, and available source metadata. Correlate it with the initiating request and expected asynchronous window. Use a harmless interaction that carries no command output, credentials, internal names, or other target-derived data.

## Interpretation and False Positives

Do not attribute a callback solely from timing proximity. Exclude prefetching, security scanners, DNS resolver behavior, service health checks, retries, shared identifiers, and callbacks triggered by the tester's own tooling. If attribution remains uncertain, report the result as unconfirmed rather than escalating impact.

## Evidence and Limits

Preserve redacted request metadata, unique identifier, callback log, clock/timezone basis, source metadata, and comparison controls. Do not interact with the callback source or pivot to observed addresses. Stop after the minimum correlated evidence or any unexpected traffic.

## Remediation Direction

Remove shell-based execution and enforce outbound egress controls, DNS policy, and service-account least privilege as compensating safeguards.

## Sources

- PortSwigger OAST: <https://portswigger.net/burp/documentation/desktop/tools/collaborator>
- PortSwigger command injection: <https://portswigger.net/web-security/os-command-injection>
