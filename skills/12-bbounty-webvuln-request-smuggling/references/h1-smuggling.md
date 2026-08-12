# HTTP/1 Message-Framing Interpretation

## Purpose

Explain HTTP/1 parser-disagreement risk at intermediary-to-origin boundaries without providing request constructions. Use when the architecture map identifies HTTP/1 on any hop.

## Preconditions

Use only in a controlled test environment, or with explicit written production authorization that defines a safe route, strict request cap, test window, and immediate escalation contact. Do not assess state-changing, authenticated, cacheable, or shared-traffic endpoints.

## Safe Methodology

First collect ordinary-request baselines. Then use one approved, low-impact differential check that tests whether the edge and origin consistently reject or normalize ambiguous framing. Use an assessor-controlled harmless marker only. Do not add a second embedded request, do not induce connection reuse, and do not issue traffic to observe downstream effects.

## Interpretation

A stable, repeatable difference between the ordinary baseline and the controlled check can indicate inconsistent HTTP/1 message-boundary handling. Timeouts, resets, status changes, or error pages alone are non-specific. Treat CDN, WAF, rate-limit, overload, and application validation behavior as competing explanations until a controlled comparison and trace evidence rule them out.

## False-Positive And Stop Controls

Apply the [decision matrix](../assets/confirmation-false-positive-decision-matrix.md). Stop after any unexpected response association, state change, cache signal, two consecutive instability events, or the authorized request cap. Never attempt to demonstrate impact on another request or user.

## Evidence

Record route ownership, protocol hop, baseline/control metadata, timestamps, request count, redacted trace IDs, response class, latency, and the control outcome. Preserve only approved redacted artifacts.

## Remediation

Require the first HTTP/1 recipient to reject conflicting message-length information, make one canonical framing decision, and close connections after malformed framing. Align intermediary and origin behavior; verify with a controlled regression.

## Sources

- [PortSwigger: HTTP request smuggling](https://portswigger.net/web-security/request-smuggling)
- [PortSwigger: Finding HTTP request smuggling vulnerabilities](https://portswigger.net/web-security/request-smuggling/finding)
