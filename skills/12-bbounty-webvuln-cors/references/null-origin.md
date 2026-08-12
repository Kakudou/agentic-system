# Null-Origin Handling

## Purpose and Preconditions

Use only when program rules permit testing `Origin: null` and the endpoint is a read-only route with harmless controlled data. `null` can arise from browser contexts such as sandboxed documents and local resources; it is not equivalent to an arbitrary website origin.

## Safe Assessment

1. Record trusted and unrelated-origin baselines first.
2. Compare the endpoint's `null` response policy and credential permission.
3. If headers suggest protected data could be shared, use a clean browser context approved by the program to establish browser-readable behavior. Do not create hosted proof pages or attempt to induce user interaction.

## Interpretation and Controls

Allowing `null` is a lead only when it combines with browser-readable access to protected data. Header-only observations, public responses, browser-specific sandbox behavior, and intermediary header rewriting are common sources of overstatement.

## Evidence and Remediation

Preserve redacted comparisons, browser conditions, response sensitivity, and cache controls. Reject `null` for protected resources unless a documented, reviewed integration requires it; use exact trusted-origin allowlists.

Sources: [PortSwigger Academy: CORS](https://portswigger.net/web-security/cors), [MDN: Origin header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Origin).
