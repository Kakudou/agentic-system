# Data And Tool Authorization Boundaries

## Purpose And Preconditions

Use when the inventory identifies data stores, retrieval systems, APIs, or action-capable tools. Require written authorization and documented expected permissions. This is a review of boundaries, not an attempt to access data or invoke tools.

## Bounded Benign Methodology

For each interface, document the calling identity, allowed data scope, permitted action scope, approval requirement, confirmation surface, and audit record. Observe normal user-visible permission cues and approved documentation. Determine whether the application independently authorizes the request before an action is possible.

## Observations And Interpretation

Model output should be treated as untrusted intent. Strong boundaries bind access to the authenticated user and a narrow purpose, apply server-side authorization, limit tool parameters, and require independent confirmation for consequential operations. Missing documentation is an uncertainty, not proof of excessive permissions.

## False-Positive Controls

Separate an advertised integration from an enabled capability. Confirm roles, tenant scope, and approval behavior through documentation or ordinary permitted UI only. Do not rely on generated text as evidence of credentials or access.

## Stop Conditions

Stop before data retrieval, account switching, permission changes, workflow submission, message sending, purchases, deletions, or any external effect. Escalate if a normal-use observation indicates that one has started.

## Evidence

Keep redacted authorization matrices, documented roles, visible confirmation behavior, source references, and gaps explicitly labeled as unverified.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM06: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)
- OWASP, [LLM Top 10](https://genai.owasp.org/llm-top-10/)
