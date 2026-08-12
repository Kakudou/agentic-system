# Architecture And Framing Coverage Worksheet

## Purpose

Document where HTTP message interpretation may change before any controlled check. This is an inventory, not a probing guide.

## Authorization Gate

Record the authorization reference, named hosts, permitted routes, environment, test window, maximum request count, and escalation contact. Do not proceed if a field is unknown.

## Coverage Table

| Route | Client protocol | Edge/CDN | WAF or proxy | Load balancer | Application gateway | Origin protocol | Connection reuse known? | Evidence source | Coverage status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  | yes/no/unknown |  | covered/gap |

## Framing Questions

- Which component terminates TLS and which component translates protocol versions?
- Which components may normalize, reject, or regenerate message-length metadata?
- Is HTTP/2 accepted from the client and downgraded before the origin?
- Which safe, non-state-changing route reaches the full chain?
- Are logs, trace IDs, and connection metadata available to distinguish an intermediary failure from origin behavior?

## Stop Conditions

Stop and escalate if mapping reveals an unapproved third-party path, shared production cache, sensitive route, uncertain traffic isolation, or unavailable escalation contact.

## Evidence

Keep redacted architecture notes, configuration statements supplied by the owner, protocol negotiation observations, and route ownership. Mark assumptions explicitly.
