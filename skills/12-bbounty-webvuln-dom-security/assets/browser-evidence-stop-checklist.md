# Browser Evidence and Stop Checklist

## Purpose and Preconditions

Use during authorized passive confirmation to preserve enough evidence for independent review and to stop before any unapproved effect.

## Before Observation

- [ ] Authorization, target origin, route, account scope, and time window are recorded.
- [ ] Flow worksheet names one source and one classified receiver.
- [ ] The marker is unique, inert, and approved.
- [ ] Browser version, relevant scripts, and feature flags are captured.

## During Observation

- [ ] Record URL/route, timestamp, and normal user action used to reach the feature.
- [ ] Preserve only necessary redacted DOM, network-navigation, or debugger observations.
- [ ] Record transformations and final context, not just marker presence.
- [ ] Do not edit cookies/storage, send messages, execute content, or access other origins.

## Stop Immediately

- [ ] Unexpected active behavior, application state change, authentication impact, or sensitive data exposure.
- [ ] Navigation or network activity outside written scope.
- [ ] Need for a state write, message transmission, browser-console recipe, or unapproved account.
- [ ] Ambiguous ownership, authorization, or inability to preserve evidence safely.

## Interpretation and False-Positive Controls

Marker visibility alone is not a vulnerability. Classify outcomes as text, encoded, rejected, absent, unexpected parsed structure, or indeterminate, then correlate them with the traced receiver.

## Evidence

Store the checklist result with flow ID, observer, environment, redacted artifacts, stop reason if any, and a clear statement of what was not tested.
