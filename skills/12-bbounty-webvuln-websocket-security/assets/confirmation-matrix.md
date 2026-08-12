# WebSocket Confirmation Matrix

## Use

Use one row per bounded hypothesis. A result is a confirmation only when normal baseline, expected behavior, observation, and cleanup are all recorded.

| Hypothesis | Normal baseline | Harmless test-account action | Expected result | Observed result | Conclusion | Cleanup | Stop trigger |
|---|---|---|---|---|---|---|---|
| Handshake maps to active test session |  | Normal feature connection |  |  |  | N/A | Secret exposure |
| Origin policy is observable |  | Normal browser handshake | Observe only |  |  | N/A | Any bypass attempt needed |
| Message schema handles marker |  | Normal action | One unique marker |  |  | Marker removed | Shared recipient or persistence |
| Per-message authorization is documented |  | Normal permitted action | Observe response |  |  | N/A | Cross-role or cross-resource test needed |

## Interpretation

Use `inconclusive` when the expected control cannot be observed safely. Do not convert a missing test into a failure claim.
