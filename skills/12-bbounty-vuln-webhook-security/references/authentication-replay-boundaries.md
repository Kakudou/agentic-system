# Authentication And Replay-Boundary Classification

## Purpose And Preconditions

Use to classify controls stated in admitted evidence. Require an observed or documented sender/receiver boundary; this reference does not authorize authentication testing.

## Methodology

Record whether evidence documents an authenticity check over the received message, a trusted sender identity boundary, freshness information, and duplicate or idempotency handling. Classify each as documented, observed, unknown, or not applicable. Do not expose secret values, signature material, full headers, or payload bodies.

## Interpretation And Controls

Documentation alone supports a documented-control statement, not proof that the receiver enforces it. A missing field in a partial capture is not proof of an absent control. A timestamp or event identifier is not, by itself, evidence that stale or duplicate deliveries are rejected. Never forge events, replay deliveries, alter signatures, or compare acceptance outcomes.

## Evidence And Handoff

Preserve redacted evidence locators and distinguish control evidence from assumptions. Ask the owner to verify implementation, key lifecycle, freshness windows, and duplicate handling internally.

## Sources

- [OWASP Webhook Security Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Webhook_Security_Guidelines_Cheat_Sheet.html)
- [Stripe Docs: Webhook signatures](https://docs.stripe.com/webhooks/signature)
