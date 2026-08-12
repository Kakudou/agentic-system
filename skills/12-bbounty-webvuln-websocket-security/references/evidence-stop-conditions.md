# Evidence and Stop Conditions

## Purpose and Preconditions

Use this guide before, during, and after an authorized assessment to prevent sensitive-data collection and impact expansion. Confirm program scope, data-handling rules, and escalation contact first.

## Bounded Methodology

1. Capture the minimum evidence needed to substantiate a normal-flow observation or harmless marker result.
2. Redact credentials, tokens, cookies, keys, personal data, private URLs, and complete message bodies unless the program explicitly requires them.
3. Record the tested endpoint, test-account-only resource, timestamp, expected result, observed result, and cleanup state.
4. Stop after one confirmation; report limitations rather than increasing test scope.

## Observation and Interpretation

- A concern requires a clear mismatch between an expected security control and an observed result, or approved configuration evidence of an absent control.
- Network errors, reconnects, and client rendering issues are not security findings without corroboration.

## False-Positive Controls

- Preserve a normal baseline before the bounded validation.
- Tie each observation to a unique marker or correlation ID and verify that background traffic did not produce the result.

## Cleanup and Stop Conditions

Remove test markers normally, close test connections, and clear sensitive local captures per engagement rules. Stop immediately for third-party data, an unintended recipient, non-test resource access, an irreversible action, rate-limit warning, or loss of authorization.

## Evidence

Use the [evidence and stop checklist](../assets/evidence-stop-checklist.md). Escalate only sanitized artifacts and state what was not tested.

## Remediation

Recommend logging privacy-safe connection and authorization decisions, retaining correlation identifiers, and maintaining tested recovery and cleanup procedures.

## Sources

- [PortSwigger: WebSocket security](https://portswigger.net/web-security/websockets)
