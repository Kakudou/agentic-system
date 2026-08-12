# Prevention Guidance

## Purpose And Preconditions

Use after a documented observation to propose proportionate corrective controls. Tie recommendations to a demonstrated boundary or an explicitly labeled design gap.

## Bounded Benign Methodology

Select the smallest applicable control: separate trusted instructions from untrusted content, preserve provenance and labels, enforce server-side authorization, minimize data and tool permissions, require user confirmation for consequential actions, and log boundary decisions. Use the [remediation lookup](../assets/remediation-lookup.md).

## Observations And Interpretation

No single prompt filter is a complete control. Defense in depth combines trustworthy data flow design, least privilege, independent authorization, constrained tool schemas, confirmation, and monitoring. Controls should make unsafe outcomes unavailable even when model output is incorrect.

## False-Positive Controls

Verify that a recommendation fits the actual architecture and does not remove needed accessibility, automation, or user control. Distinguish a design recommendation from a verified remediation.

## Stop Conditions

Do not change production prompts, permissions, integrations, logging, or policies as part of assessment unless separately authorized. Do not recommend retaining sensitive prompt or user content solely for debugging.

## Evidence

Link each recommendation to the observation, affected boundary, owner, and a safe verification criterion. Mark unverified implementation details.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM Top 10](https://genai.owasp.org/llm-top-10/)
