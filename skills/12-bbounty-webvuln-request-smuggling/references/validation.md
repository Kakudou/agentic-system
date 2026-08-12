# Low-Impact Differential Validation

## Purpose

Provide a bounded method for distinguishing a potential framing inconsistency from ordinary transport or application failures.

## Preconditions

Obtain explicit authorization for the named target, route, protocol variants, request cap, test window, and escalation contact. Prefer an isolated environment. In production, proceed only when the owner confirms traffic isolation and accepts the stop conditions.

## Safe Methodology

1. Send the minimum approved number of ordinary, non-state-changing baseline requests.
2. Record response class, selected headers, body class, latency, connection behavior, and owner-provided trace identifiers.
3. Send one authorized benign differential check using a unique harmless correlation value.
4. Send at most one ordinary control request if the budget permits and no stop condition occurred.
5. Compare only the controlled request with its baselines. Escalate for owner-assisted controlled confirmation rather than attempting a downstream demonstration.

## Interpretation

Potential evidence is a stable, repeatable difference isolated to an identified framing boundary while ordinary controls remain stable. A single timeout, status difference, or reset is inconclusive. Rate limiting, bot mitigation, load balancing, compression, route rewriting, connection churn, and application validation must be ruled out with owner-provided traces or controlled-environment comparison.

## Volume And Impact Limits

Use the explicit authorized cap. The default when no cap is supplied is zero test requests. Never parallelize, fuzz, scan, retry automatically, hold connections, or increase traffic to obtain a stronger signal. Stop immediately according to the [impact checklist](../assets/impact-stop-condition-checklist.md).

## Evidence

Keep the authorization reference, route map, request count, exact timing, redacted metadata comparison, correlation value, trace references, and rationale for classification. Do not retain raw secrets or replay-ready traffic.

## Remediation

If a potential signal remains, recommend parser alignment and controlled regression testing, not impact exploitation. See the [remediation lookup](../assets/remediation-lookup.md).

## Sources

- [PortSwigger: Finding HTTP request smuggling vulnerabilities](https://portswigger.net/web-security/request-smuggling/finding)
- [PortSwigger: HTTP request smuggling](https://portswigger.net/web-security/request-smuggling)
