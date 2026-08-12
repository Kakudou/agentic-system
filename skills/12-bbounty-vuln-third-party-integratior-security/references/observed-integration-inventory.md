# Observed Integration Inventory

## Purpose

Create a bounded, evidence-based inventory of inbound and outbound integrations without endpoint discovery or traffic generation.

## Preconditions

- Admitted scope and ownership.
- Approved sources: owner-provided diagrams, redacted settings, normal-use UI, approved logs, or vendor documentation.

## Method

For each source, record only visible or documented flows. Inbound flows deliver data or events to the application; outbound flows send data or requests from it. Capture the declared vendor, purpose, initiating system, receiving system, and evidence location. Use one normal-use observation only when expressly approved.

## Interpretation and Scope Controls

Disabled settings, stale documentation, SDK dependencies, and generic domains may not establish a live integration. Label the evidence source and confidence rather than treating absence as proof. Do not enumerate routes, inspect hidden fields, replay messages, or infer a vendor from sensitive content.

## Evidence and Handoff

Use the worksheet to preserve a redacted inventory. Escalate undocumented live-looking flows, conflicting sources, or unknown destinations to the system owner.

## Sources

- [OWASP API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x11-t10/)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
