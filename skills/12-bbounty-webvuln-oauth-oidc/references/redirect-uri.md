# Redirect URI Validation

## Purpose And Preconditions

Assess whether the authorization server and client handle registered callbacks as a fixed trust boundary. Obtain explicit permission before varying callback input. Never use a destination you do not control or that could receive a live artifact.

## Safe Bounded Method

1. Document the registered callback and the callback observed in one normal test-account flow.
2. Review configuration or documentation for exact-match rules, normalization behavior, and per-client registration.
3. If explicitly authorized, submit a single inert, non-routable callback variation that cannot receive an authorization result. Observe only acceptance or rejection and stop before authentication or consent completes.
4. Check that the same registered callback is bound at authorization and code redemption where the deployment uses a code flow.

## Observations And Interpretation

| Observation | Interpretation |
| --- | --- |
| Exact registered value is required | Expected control. Confirm it applies per client. |
| A safe inert variation is accepted | Investigate normalization and artifact delivery risk with the program before further testing. |
| Client performs a local post-login redirect | Separate this application navigation behavior from authorization-server callback registration. |

## False-Positive Controls

- URL display normalization does not prove a server accepted a different registered callback.
- A rejected request after the login screen may still have validated the callback; capture the decisive response.
- Do not treat development, native loopback, or custom-scheme registrations as defects without the applicable client-type policy.

## Evidence

Retain the redacted registered value, safe test value, client identifier, decisive acceptance/rejection response, and confirmation that no artifact was delivered.

## Remediation

Require exact registered callback matching per client. Avoid broad patterns and unneeded callback entries. Bind the callback consistently across authorization and token processing, and minimize post-login redirects.

## PortSwigger Sources

- [Flawed redirect URI validation](https://portswigger.net/web-security/oauth)
