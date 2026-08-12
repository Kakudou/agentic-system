# Instruction Risks And Trust Boundaries

## Purpose And Preconditions

Use when the application accepts user input, retrieves external material, or passes model output to another component. Require the completed inventory and a documented normal-use path.

## Bounded Benign Methodology

Map content origin, identity, privilege, and destination at each handoff: user to application, retrieved content to model context, model output to tool broker, and response to user. Note whether untrusted content is labeled, isolated, filtered, or subject to an independent authorization check. Do not submit adversarial instructions.

## Observations And Interpretation

Direct instruction risk concerns untrusted user content competing with application-defined instructions. Indirect instruction risk concerns untrusted content from a retrieved or connected source being treated as instructions. Either is a risk hypothesis only when a boundary could influence an unauthorized data access or action.

## False-Positive Controls

Do not equate text appearing in a response with instruction execution. Confirm content provenance, the intended processing path, and a separately observable boundary control. A model's stated behavior is not proof of runtime enforcement.

## Stop Conditions

Stop if confirmation would require retrieving non-test content, requesting hidden context, crossing accounts, or causing an external action. Escalate boundary ambiguity to the owner.

## Evidence

Preserve a redacted boundary diagram, source labels, stated authorization checks, normal-use observations, and unresolved assumptions.

## Sources

- PortSwigger, [Web LLM attacks](https://portswigger.net/web-security/llm-attacks)
- OWASP, [LLM01: Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
